import React, { useState } from 'react';
import { FaCalendarPlus, FaTimes, FaUpload, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { AppRoutes } from '../../../constant/constant';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddNewEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    startdate: '',
    enddate: '',
    category: 'nonticketing', // Default to non-ticketing
    description: '',
    status: 'active',
    locationDetails: 'CS&IT Department',
    registrationDeadline: ''
  });
<<<<<<< HEAD
  
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
=======
  const [selectedFile, setSelectedFile] = useState(null); // add this at top
>>>>>>> 2e14725d6bf9c67935919abbe5dbfbcde1b8db64
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

<<<<<<< HEAD
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        notification.error({
          message: 'Invalid File',
          description: 'Please upload an image file (JPEG, PNG)',
          placement: 'topRight'
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        notification.error({
          message: 'File Too Large',
          description: 'Maximum file size is 5MB',
          placement: 'topRight'
        });
        return;
      }

      setBannerImage(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };
=======
 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fakeUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, eventimageurl: fakeUrl })); // for preview
    setSelectedFile(file); // for upload
  }
};
>>>>>>> 2e14725d6bf9c67935919abbe5dbfbcde1b8db64

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      if (!file.type.match('image.*')) {
        notification.error({
          message: 'Invalid File',
          description: `Skipped ${file.name} - Only images allowed`,
          placement: 'topRight'
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        notification.error({
          message: 'File Too Large',
          description: `Skipped ${file.name} - Max 5MB`,
          placement: 'topRight'
        });
        return false;
      }
      return true;
    });

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    
    setGalleryImages(prev => [...prev, ...validFiles]);
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeGalleryImage = (index) => {
    const newImages = [...galleryImages];
    const newPreviews = [...galleryPreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setGalleryImages(newImages);
    setGalleryPreviews(newPreviews);
  };

  const validateForm = () => {
    const requiredFields = {
      title: 'Event title',
      startdate: 'Event date',
      description: 'Description',
    };

    for (const [field, name] of Object.entries(requiredFields)) {
      if (!formData[field]?.trim()) {
        notification.error({
          message: 'Validation Error',
          description: `${name} is required`,
          placement: 'topRight'
        });
        return false;
      }
    }

    if (!bannerImage) {
      notification.error({
        message: 'Validation Error',
        description: 'Banner image is required',
        placement: 'topRight'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsSubmitting(true);

<<<<<<< HEAD
  try {
    const formPayload = new FormData();
    
    // Append all form data as JSON string
    formPayload.append('data', JSON.stringify(formData));
    
    // Append banner image with correct field name
    formPayload.append('bannerImage', bannerImage);
    
    // Append gallery images with correct field name
    galleryImages.forEach((image, index) => {
      formPayload.append('galleryImages', image);
    });

    const res = await axios.post(AppRoutes.event, formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000
=======
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
>>>>>>> 2e14725d6bf9c67935919abbe5dbfbcde1b8db64
    });

    notification.success({
      message: 'Success',
      description: 'Event created successfully!',
      placement: 'topRight'
    });

<<<<<<< HEAD
    navigate('/adminpanel/manageevents');
=======
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

>>>>>>> 2e14725d6bf9c67935919abbe5dbfbcde1b8db64

  } catch (err) {
    console.error('Error:', err);
    
    let errorMessage = 'Failed to create event. Please try again.';
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    notification.error({
      message: 'Error',
      description: errorMessage,
      placement: 'topRight',
      duration: 5
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 flex items-center text-gray-800">
        <FaCalendarPlus className="mr-2 text-blue-600" />
        Create New Event
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Event Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">Event Title *</label>
              <input
<<<<<<< HEAD
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event title"
=======
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                name="eventBannerImage"
>>>>>>> 2e14725d6bf9c67935919abbe5dbfbcde1b8db64
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">Event Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">Event Date *</label>
              <input
                type="date"
                name="startdate"
                value={formData.startdate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">End Date (Optional)</label>
              <input
                type="date"
                name="enddate"
                value={formData.enddate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">Event Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="nonticketing">Non-Ticketing</option>
                <option value="ticketing">Ticketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">Event Location</label>
              <input
                name="locationDetails"
                value={formData.locationDetails}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter location details"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-600">Event Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
              placeholder="Detailed event description..."
            />
          </div>
        </div>

        {/* Banner Image Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Banner Image *
          </h2>
          
          <div className="flex flex-col items-center justify-center w-full bg-white hover:bg-gray-50 transition-colors duration-200 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer">
            {!bannerPreview ? (
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full">
                  <FaUpload className="text-2xl text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">
                    Drag & drop your banner image here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Recommended size: 1920x1080px (Max. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                  id="banner-upload"
                  required
                />
                <label
                  htmlFor="banner-upload"
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Select Banner
                </label>
              </div>
            ) : (
              <div className="w-full">
                <div className="relative group">
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="w-full h-64 object-cover rounded-lg shadow-sm border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBannerPreview('');
                      setBannerImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Click the X button to change banner image
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Images Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Gallery Images (Optional)
          </h2>
          
          <div className="mb-6">
            <div className="flex flex-col items-center justify-center w-full bg-white hover:bg-gray-50 transition-colors duration-200 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full">
                  <FaUpload className="text-2xl text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">
                    Add multiple images to showcase your event
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG (Max. 5MB per image)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGalleryChange}
                  className="hidden"
                  id="gallery-upload"
                  multiple
                />
                <label
                  htmlFor="gallery-upload"
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <FaPlus className="mr-2" />
                  Add Gallery Images
                </label>
              </div>
            </div>
          </div>

          {galleryPreviews.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Selected Images ({galleryPreviews.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Gallery preview ${index + 1}`}
                      className="h-40 w-full object-cover rounded-lg shadow-sm border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      aria-label="Remove image"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/adminpanel/manageevents')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewEvent;