import React, { useState } from 'react';
import { FaTrash, FaEdit, FaUpload, FaEye } from 'react-icons/fa';

const GalleryManagement = () => {
  // Sample state for image files
  const [mediaFiles, setMediaFiles] = useState([
    { id: 1, name: 'Event Poster', url: '/assets/images/event1.jpg' },
    { id: 2, name: 'SMEC Highlights', url: '/assets/images/smec_highlights.jpg' },
  ]);

  // States for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newFile, setNewFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [mediaToDelete, setMediaToDelete] = useState(null);
  const [mediaToEdit, setMediaToEdit] = useState(null);

  // Handle adding new image
  const handleAddImage = () => {
    if (newFile && fileName) {
      const newImage = {
        id: Date.now(),
        name: fileName,
        url: URL.createObjectURL(newFile), // Temporary URL for the image
      };
      setMediaFiles([...mediaFiles, newImage]);
      setShowAddModal(false);
    } else {
      alert('Please provide both an image and a description.');
    }
  };

  // Handle editing image
  const handleEditImage = () => {
    if (fileName) {
      const updatedImages = mediaFiles.map((file) =>
        file.id === mediaToEdit.id ? { ...file, name: fileName, url: currentFile ? URL.createObjectURL(currentFile) : file.url } : file
      );
      setMediaFiles(updatedImages);
      setShowEditModal(false);
    } else {
      alert('Please provide a description for the image.');
    }
  };

  // Handle deleting image
  const handleDeleteImage = () => {
    setMediaFiles(mediaFiles.filter(file => file.id !== mediaToDelete.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Gallery Management</h2>

      {/* Button to Add Image */}
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
      >
        <FaUpload /> Add Image
      </button>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaFiles.map((file) => (
          <div key={file.id} className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <img src={file.url} alt={file.name} className="w-full h-64 object-cover" />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full">
              <p>{file.name}</p>
            </div>

            {/* Edit and Delete Options */}
            <div className="absolute top-0 right-0 p-2">
              <button
                onClick={() => {
                  setMediaToEdit(file);
                  setFileName(file.name);
                  setShowEditModal(true);
                }}
                className="bg-yellow-400 text-white p-1 rounded-full"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  setMediaToDelete(file);
                  setShowDeleteModal(true);
                }}
                className="bg-red-600 text-white p-1 rounded-full ml-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Add New Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewFile(e.target.files[0])}
              className="mb-4"
            />
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Image Description"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Image
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCurrentFile(e.target.files[0])}
              className="mb-4"
            />
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Image Description"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={handleEditImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Image Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Delete Image</h3>
            <p>Are you sure you want to delete this image?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
