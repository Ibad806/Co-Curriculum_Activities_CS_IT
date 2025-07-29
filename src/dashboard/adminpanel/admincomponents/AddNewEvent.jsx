import React, { useState } from 'react';
import { FaCalendarPlus, FaTimes, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';
import { notification } from 'antd';
import {  useNavigate } from 'react-router-dom';

const AddNewEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    startdate: '',
    enddate: '',
    category: '',
    subcategory: '',
    description: '',
    ticketPrice: '',
    status: 'active',
    eventimageurl: '',
    registrationDeadline: '',
    locationDetails: 'CS&IT Department',
  });
  const [selectedFile, setSelectedFile] = useState(null); // add this at top
  const navigate = useNavigate();

  const subcategoryOptions = {
    ticketing: ['SMCE', 'Qawali night', 'Annual Dinner'],
    nonticketing: ['seminar', 'blood drive', 'winter drive'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category' ? { subcategory: '' } : {}),
    }));
  };

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fakeUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, eventimageurl: fakeUrl })); // for preview
    setSelectedFile(file); // for upload
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

   const form = new FormData();
  form.append("title", formData.title);
  form.append("status", formData.status);
  form.append("startdate", formData.startdate);
  form.append("registrationDeadline", formData.registrationDeadline || formData.startdate);
  form.append("category", formData.category);
  form.append("subcategory", formData.subcategory);
  form.append("description", formData.description);
  form.append("ticketPrice", formData.ticketPrice);
  form.append("locationDetails", formData.locationDetails)

    if (selectedFile) {
    form.append("eventBannerImage", selectedFile); // MUST MATCH multer field
  }

  try {
    const res = await axios.post(AppRoutes.event, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

       notification.success({
              message: 'Success',
              description: 'Event created successfully!',
              placement: 'topRight'
            });

             setFormData({
      title: '',
      startdate: '',
      enddate: '',
      category: '',
      subcategory: '',
      description: '',
      ticketPrice: '',
      status: 'active',
      eventimageurl: '',
      registrationDeadline: '',
      locationDetails: 'CS&IT Department',
    });


            navigate('/adminpanel/manageevents', { replace: true });


    } catch (err) {
      console.error(err);
      notification.success({
        message: 'Error',
        description: 'Failed to create event. Please try again.',
        placement: 'topRight'
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FaCalendarPlus className="mr-2 text-blue-500" />
        Create New Event
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Date </label>
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Registration Deadline</label>
            <input
              type="date"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location details"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Event Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="ticketing">Ticketing</option>
              <option value="nonticketing">Non-Ticketing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Subcategory</option>
              {subcategoryOptions[formData.category]?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Event Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Detailed event description..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Event Banner</label>


          <div className="flex flex-col items-center justify-center w-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full">
                <FaUpload className="text-2xl text-blue-500" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Drag & drop your image here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG (Max. 5MB)
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                name="eventBannerImage"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                Select File
              </label>
            </div>

            {formData.eventimageurl && (
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                <div className="relative inline-block group">
                  <img
                    src={formData.eventimageurl}
                    alt="Event Preview"
                    className="h-32 w-auto rounded-lg object-cover shadow-md border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, eventimageurl: '' })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Remove image"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Ticket Price ($)</label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Location</label>
            <input
              name="locationDetails"
              value={formData.locationDetails}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location details"
            />
          </div>


        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddNewEvent;
