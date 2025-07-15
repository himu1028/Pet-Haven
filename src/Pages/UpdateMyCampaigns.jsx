import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxoisSecure";
const UpdateMyCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const campaign = useLoaderData(); 
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(campaign.petImage);
  const [uploading, setUploading] = useState(false);
console.log(campaign)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      petName: campaign.petName,
      organizerName: campaign.organizerName,
      contactEmail: campaign.contactEmail,
      location: campaign.location,
      maxDonation: campaign.maxDonation,
      lastDate: campaign.lastDate,
      shortDesc: campaign.shortDesc,
      description: campaign.description,
    },
  });

  //  Image Upload Handler
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

  // Form Submit
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        petImage: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await axiosSecure.put(
        `http://localhost:3000/donationCompaigns/${campaign._id}`,
        updatedData
      );

      alert("Campaign updated successfully!");
    navigate("/dashboard/dashboard/mydonationcampaign");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Donation Campaign</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/*  Pet Name */}
        <div>
          <label className="block font-medium">Pet Name</label>
          <input
            {...register("petName", { required: "Required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.petName && <p className="text-red-500">{errors.petName.message}</p>}
        </div>

        {/*  Pet Picture */}
        <div>
          <label className="block font-medium">Pet Picture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Pet" className="w-32 mt-2 rounded" />}
        </div>

        {/*  Location */}
        <div>
          <label className="block font-medium">Pickup Location</label>
          <input
            {...register("location", { required: "Required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        {/*  Organizer Name */}
        <div>
          <label className="block font-medium">Organizer Name</label>
          <input
            {...register("organizerName", { required: "Required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.organizerName && <p className="text-red-500">{errors.organizerName.message}</p>}
        </div>

        {/*  Contact Email */}
        <div>
          <label className="block font-medium">Contact Email</label>
          <input
            type="email"
            {...register("contactEmail", { required: "Required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.contactEmail && <p className="text-red-500">{errors.contactEmail.message}</p>}
        </div>

        {/*  Max Donation Amount */}
        <div>
          <label className="block font-medium">Maximum Donation Amount</label>
          <input
            type="number"
            {...register("maxDonation", { required: "Required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.maxDonation && <p className="text-red-500">{errors.maxDonation.message}</p>}
        </div>

        {/*  Last Date */}
        <div>
          <label className="block font-medium">Last Date</label>
          <input
            type="date"
            {...register("lastDate", { required: "Required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.lastDate && <p className="text-red-500">{errors.lastDate.message}</p>}
        </div>

        {/*  Short Desc */}
        <div>
          <label className="block font-medium">Short Description</label>
          <input
            {...register("shortDesc", { required: "Required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.shortDesc && <p className="text-red-500">{errors.shortDesc.message}</p>}
        </div>

        {/*  Long Desc */}
        <div>
          <label className="block font-medium">Long Description</label>
          <textarea
            {...register("longDesc", { required: "Required" })}
            className="w-full h-28 px-4 py-2 border rounded"
          />
          {errors.longDesc && <p className="text-red-500">{errors.longDesc.message}</p>}
        </div>

        {/*  Submit */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyCampaigns;
