// PetDetails.jsx
import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
 import SkeletonCard from '../../Component/SkeletonCard';

Modal.setAppElement("#root");

const PetDetails = () => {
  const { user } = useAuth();
  const petData = useLoaderData();

  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setPet(petData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [petData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const adoptionData = {
      petId: pet._id,
      status: "pending",
      petName: pet.petName,
      petImage: pet.petImage,
      userName: user.displayName,
      email: user.email,
      ownerEmail: pet.email,
      phone: data.phone,
      address: data.address,
      requestedAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adoptionData),
      });

      const result = await res.json();

      if (result.insertedId) {
        Swal.fire(
          "Request Sent!",
          "Your adoption request has been submitted.",
          "success"
        );
        setIsOpen(false);
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit adoption request", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {loading ? (
        <SkeletonCard />
      ) : (
        <>
          <img
            src={pet.petImage}
            alt={pet.petName}
            className="w-full h-[400px] object-cover rounded-xl"
          />
          <h2 className="text-4xl font-bold mt-6">{pet.petName}</h2>
          <p className="text-lg text-gray-600 mt-2">{pet.shortDescription}</p>
          <div className="mt-4 text-gray-700 space-y-2">
            <p>
              <strong>Age:</strong> {pet.petAge} years
            </p>
            <p>
              <strong>Category:</strong> {pet.petCategory?.value}
            </p>
            <p>
              <strong>Location:</strong> {pet.petLocation}
            </p>
            <p>
              <strong>Gender:</strong> {pet.gender}
            </p>
            <p>
              <strong>Color:</strong> {pet.color}
            </p>
            <p>
              <strong>Breed:</strong> {pet.breed}
            </p>
            <p>
              <strong>Size:</strong> {pet.size}
            </p>
            <p>
              <strong>Long Description:</strong> {pet.longDescription}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Adopt
          </button>
        </>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Adoption Form"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-semibold mb-4">Adopt {pet?.petName}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" value={pet?.petName} readOnly />
          <input type="hidden" value={pet?._id} readOnly />
          <input type="hidden" value={pet?.petImage} readOnly />

          {/* User Name */}
          <input
            type="text"
            value={user?.displayName}
            disabled
            className="w-full px-4 py-2 bg-gray-100 rounded border"
          />

          {/* Email */}
          <input
            type="email"
            value={user?.email}
            disabled
            className="w-full px-4 py-2 bg-gray-100 rounded border"
          />

          {/* Phone */}
          <input
            type="text"
            {...register("phone", { required: "Phone is required" })}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}

          {/* Address */}
          <textarea
            {...register("address", { required: "Address is required" })}
            placeholder="Your Address"
            className="w-full px-4 py-2 border rounded"
          ></textarea>
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit Request
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PetDetails;
