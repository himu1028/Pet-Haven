import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import useAxiosSecure from "../Hooks/useAxoisSecure";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const categoryOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Fish", label: "Fish" },
];

const UpdateMyPets = () => {
  const pet = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [imageUrl, setImageUrl] = useState(pet.petImage);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      petName: pet.petName,
      petAge: pet.petAge,
      petLocation: pet.petLocation,
      shortDescription: pet.shortDescription,
      longDescription: pet.longDescription,
      petCategory:
        typeof pet.petCategory === "object"
          ? pet.petCategory
          : { value: pet.petCategory, label: pet.petCategory },
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      setImageUrl(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert("Please upload a pet image");
      return;
    }

    const updatedPet = {
      petImage: imageUrl,
      petName: data.petName,
      petAge: data.petAge,
      petCategory: data.petCategory?.value || "",
      petLocation: data.petLocation,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      editedAt: new Date().toISOString(),
      adopted: false,
    };

    try {
      await axiosSecure.put(`http://localhost:3000/allpets/${pet._id}`, updatedPet);
      alert("Pet updated successfully!");
      navigate("/dashboard/dashboard/allpetts");
    } catch (err) {
      console.error("Update failed", err);
      alert("Something went wrong while updating pet");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Pet</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 🖼 Image Upload */}
        <div>
          <label className="block font-medium">Pet Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Preview" className="w-32 mt-2 rounded" />}
        </div>

        {/* Pet Name */}
        <div>
          <label className="block font-medium">Pet Name</label>
          <input
            {...register("petName", { required: "Pet name is required" })}
            className="input w-full"
          />
          {errors.petName && <p className="text-red-500 text-sm">{errors.petName.message}</p>}
        </div>

        {/* Pet Age */}
        <div>
          <label className="block font-medium">Pet Age</label>
          <input
            type="number"
            {...register("petAge", { required: "Pet age is required" })}
            className="input w-full"
          />
          {errors.petAge && <p className="text-red-500 text-sm">{errors.petAge.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <Controller
            name="petCategory"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={categoryOptions}
                onChange={(selected) => field.onChange(selected)}
              />
            )}
          />
          {errors.petCategory && (
            <p className="text-red-500 text-sm">{errors.petCategory.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Pickup Location</label>
          <input
            {...register("petLocation", { required: "Location is required" })}
            className="input w-full"
          />
          {errors.petLocation && (
            <p className="text-red-500 text-sm">{errors.petLocation.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-medium">Short Description</label>
          <input
            {...register("shortDescription", {
              required: "Short description is required",
            })}
            className="input w-full"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
          )}
        </div>

        {/* Long Description (ReactQuill) */}
        <div>
          <label className="block font-medium">Long Description</label>
          <Controller
            name="longDescription"
            control={control}
            rules={{ required: "Long description is required" }}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Write long description..."
                className="bg-white"
              />
            )}
          />
          {errors.longDescription && (
            <p className="text-red-500 text-sm">{errors.longDescription.message}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyPets;
