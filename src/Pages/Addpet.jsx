import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';

const categoryOptions = [
  { value: 'Dog', label: 'Dog' },
  { value: 'Cat', label: 'Cat' },
  { value: 'Bird', label: 'Bird' },
  { value: 'Rabbit', label: 'Rabbit' },
  { value: 'Fish', label: 'Fish' },
];

const Addpet = () => {
  const { user} = useAuth();
  
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // 📷 Image upload to imgbb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, // 🛑 Replace with your key
        formData
      );
      console.log(res.data)
      setImageUrl(res.data.data.url);
    } catch (err) {
      console.error('Image upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  // 📨 Submit handler
  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert('Please upload a pet image');
      return;
    }

    const petData = {
      petImage: imageUrl,
      email:user.email,
      petName: data.petName,
      petAge: data.petAge,
      petCategory: data.petCategory,
      petLocation: data.petLocation,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      adopted: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post('http://localhost:3000/pets', petData);
      alert('Pet added successfully!');
      reset();
      setImageUrl('');
    } catch (error) {
      console.error('Error submitting pet:', error);
      alert('Submission failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-300 rounded ">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Pet</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* 📷 Pet Image */}
        <div>
          <label className="block font-medium">Pet Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Pet" className=" mt-2 w-16 rounded" />}
        </div>

        {/* 🐾 Pet Name */}
       <div>
  <label className="block font-medium mb-1">Pet Name</label>
  <input
    {...register('petName', { required: 'Pet name is required' })}
    placeholder="Enter pet name"
    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
  {errors.petName && (
    <p className="text-red-500 text-sm mt-1">{errors.petName.message}</p>
  )}
</div>

        {/* 🎂 Pet Age */}
        <div>
          <label className="block font-medium">Pet Age</label>
          <input
            type="number"
            {...register('petAge', { required: 'Pet age is required' })}
            className="input"
          />
          {errors.petAge && <p className="text-red-500 text-sm">{errors.petAge.message}</p>}
        </div>

        {/* 🐕 Pet Category */}
        <div>
          <label className="block font-medium">Pet Category</label>
          <Controller
            name="petCategory"
            control={control}
            rules={{ required: 'Pet category is required' }}
            render={({ field }) => (
              <Select {...field} options={categoryOptions} />
            )}
          />
          {errors.petCategory && <p className="text-red-500 text-sm">{errors.petCategory.message}</p>}
        </div>

        {/* 📍 Pickup Location */}
        <div>
          <label className="block font-medium">Pickup Location</label>
          <input
            {...register('petLocation', { required: 'Location is required' })}
            placeholder='Location Name'
            className="input"
          />
          {errors.petLocation && <p className="text-red-500 text-sm">{errors.petLocation.message}</p>}
        </div>

        {/* 📝 Short Description */}
        <div>
          <label className="block font-medium">Short Description</label>
          <input
           placeholder='Write mini note'
            {...register('shortDescription', { required: 'Short description is required' })}
            className="input"
          />
          {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>}
        </div>

        {/* 📄 Long Description */}
        <div>
          <label className="block font-medium">Long Description</label>
          <textarea
            {...register('longDescription', { required: 'Long description is required' })}
            className="input h-28"
          />
          {errors.longDescription && <p className="text-red-500 text-sm">{errors.longDescription.message}</p>}
        </div>

        {/* 🚀 Submit */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addpet;
