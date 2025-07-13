import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import RecommendedDonations from './RecommendedDonations';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

// Load Stripe publishable key from env
const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

const CheckoutForm = ({ amount, email, donation, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // 1. Create payment intent
      const res = await axios.post('http://localhost:3000/donatorsS', {
        amount: parseInt(amount),
      });
      const clientSecret = res.data.clientSecret;

      // 2. Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        Swal.fire("Payment Failed", result.error.message, "error");
      } else if (result.paymentIntent.status === 'succeeded') {
        // 3. Save to MongoDB donation collection
        const donationInfo = {
          petId: donation._id,
          petName: donation.petName,
          donatedFor: donation.petName,
          amount: parseInt(amount),
          email,
          paymentId: result.paymentIntent.id,
          donatedAt: new Date(),
        };

        await axios.post('http://localhost:3000/donators', donationInfo);

        // 4. Update donatedAmount
        await axios.patch(`http://localhost:3000/donationCompaigns/${donation._id}`, {
          donatedAmount: parseInt(amount),
        });

        Swal.fire("Success!", "Donation successful!", "success");
        onClose();
      }
    } catch (err) {
      console.error('Payment error:', err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || !amount}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Pay ${amount}
      </button>
    </form>
  );
};

const CompaignsDetails = () => {
  const donation = useLoaderData();
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');

  // ✅ Check paused status before opening modal
  const handleDonateClick = () => {
    if (donation?.paused) {
      return Swal.fire({
        icon: "warning",
        title: "This campaign is paused!",
        text: "The owner has temporarily paused donations for this campaign.",
        confirmButtonText: "OK",
      });
    }

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Donation Details */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
        <img
          src={donation?.petImage}
          alt={donation?.petName}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">{donation?.petName}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Max Donation:</span> ${donation?.maxDonation}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Donated So Far:</span> ${donation?.donatedAmount}
        </p>
        <p className="text-gray-600 mb-4">{donation?.description}</p>
        <button
          onClick={handleDonateClick}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Donate Now
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Donate to {donation.petName}</h3>

            <input
              type="text"
              value={donation.petName}
              disabled
              className="w-full border border-gray-300 p-2 rounded mb-3 bg-gray-100"
            />

            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full border border-gray-300 p-2 rounded mb-3 bg-gray-100"
            />

            <input
              type="number"
              value={amount}
              onChange={(e) => {
                const inputAmount = parseInt(e.target.value);
                if (!isNaN(inputAmount) && inputAmount <= donation.maxDonation) {
                  setAmount(inputAmount);
                } else {
                  Swal.fire("Invalid Amount", `You can't donate more than $${donation.maxDonation}`, "warning");
                }
              }}
              className="w-full border border-gray-300 p-2 rounded mb-3"
              placeholder={`Enter amount (Max $${donation.maxDonation})`}
              required
            />

            {/* Stripe Form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={amount}
                email={user?.email}
                donation={donation}
                onClose={handleCloseModal}
              />
            </Elements>

            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Recommended Donations */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Recommended Donations</h2>
        <RecommendedDonations />
      </div>
    </div>
  );
};

export default CompaignsDetails;
