import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddDonationCampaign = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🖼️ Upload image to imgbb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=your_imgbb_api_key`, // Replace this
        formData
      );
      setImageUrl(res.data.data.url);
    } catch (err) {
      console.error('Image upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Form submit
  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert('Please upload a pet picture');
      return;
    }

    const campaignData = {
      petImage: imageUrl,
      maxAmount: data.maxAmount,
      lastDate: data.lastDate,
      shortDesc: data.shortDesc,
      longDesc: data.longDesc,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:5000/donations', campaignData);
      alert('Donation campaign added successfully!');
      reset();
      setImageUrl('');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Submission failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Donation Campaign</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* 🖼️ Pet Picture */}
        <div>
          <label className="block font-medium">Pet Picture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Pet" className="w-32 mt-2 rounded" />}
        </div>

        {/* 💸 Max Donation Amount */}
        <div>
          <label className="block font-medium">Maximum Donation Amount</label>
          <input
            type="number"
            {...register('maxAmount', { required: 'Required' })}
            placeholder="e.g. 5000"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.maxAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.maxAmount.message}</p>
          )}
        </div>

        {/* 📅 Last Date */}
        <div>
          <label className="block font-medium">Last Date of Donation</label>
          <input
            type="date"
            {...register('lastDate', { required: 'Required' })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastDate && (
            <p className="text-red-500 text-sm mt-1">{errors.lastDate.message}</p>
          )}
        </div>

        {/* 📜 Short Description */}
        <div>
          <label className="block font-medium">Short Description</label>
          <input
            {...register('shortDesc', { required: 'Required' })}
            placeholder="Short note..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.shortDesc && (
            <p className="text-red-500 text-sm mt-1">{errors.shortDesc.message}</p>
          )}
        </div>

        {/* 📄 Long Description */}
        <div>
          <label className="block font-medium">Long Description</label>
          <textarea
            {...register('longDesc', { required: 'Required' })}
            placeholder="Detailed info..."
            className="w-full h-28 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.longDesc && (
            <p className="text-red-500 text-sm mt-1">{errors.longDesc.message}</p>
          )}
        </div>

        {/* 🚀 Submit */}
        <div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonationCampaign;
