import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaTimes, FaEdit, FaTrash, FaImage, FaUpload } from "react-icons/fa";
import { AppRoutes } from "../../../constant/constant";

// CategoryModal Component
const CategoryModal = ({
  showModal,
  setShowModal,
  isEditMode,
  initialCategory,
  leadOptions,
  coLeadOptions,
  handleAddCategory,
  handleUpdateCategory,
}) => {
  const [newCategory, setNewCategory] = useState(
    initialCategory || {
      title: "",
      description: "",
      lead: "",
      coLead: "",
    }
  );
  const [cardImagePreview, setCardImagePreview] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  useEffect(() => {
    if (showModal && initialCategory) {
      setNewCategory(initialCategory);

      // Set image previews if available in edit mode
      if (isEditMode && initialCategory.cardImageUrl) {
        setCardImagePreview(initialCategory.cardImageUrl);
      }

      if (isEditMode && initialCategory.bannerImageUrl) {
        setBannerImagePreview(initialCategory.bannerImageUrl);
      }
    }
  }, [showModal, initialCategory, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdateCategory(newCategory);
      setNewCategory({
        title: "",
        description: "",
        lead: "",
        coLead: "",
        cardImage: null,
        bannerImage: null,
      })
    } else {
      handleAddCategory(newCategory);
      setNewCategory({
        title: "",
        description: "",
        lead: "",
        coLead: "",
        cardImage: null,
        bannerImage: null,
        });
    }
  };

  const handleInputChange = (field, value) => {
    setNewCategory({ ...newCategory, [field]: value });
  };

  const handleCardImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory({ ...newCategory, cardImage: file });
      setCardImagePreview(URL.createObjectURL(file));
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory({ ...newCategory, bannerImage: file });
      setBannerImagePreview(URL.createObjectURL(file));
    }
  };

  const removeCardImage = () => {
    setCardImagePreview(null);
    setNewCategory({ ...newCategory, cardImage: null });
  };

  const removeBannerImage = () => {
    setBannerImagePreview(null);
    setNewCategory({ ...newCategory, bannerImage: null });
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden transform transition-all">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? "Edit Category" : "Add Category"}</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter category title"
                value={newCategory.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  {cardImagePreview ? (
                    <div className="relative">
                      <img
                        src={cardImagePreview || "/placeholder.svg"}
                        alt="Card Preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeCardImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <FaImage className="text-gray-400 text-4xl mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Click to upload card image</p>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleCardImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                        >
                          <FaUpload className="mr-2" /> Browse
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  {bannerImagePreview ? (
                    <div className="relative">
                      <img
                        src={bannerImagePreview || "/placeholder.svg"}
                        alt="Banner Preview"
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeBannerImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <FaImage className="text-gray-400 text-4xl mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Click to upload banner image</p>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleBannerImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                        >
                          <FaUpload className="mr-2" /> Browse
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                placeholder="Enter category description"
                value={newCategory.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Lead and Co-Lead Selects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="lead" className="block text-sm font-medium text-gray-700 mb-1">
                  Lead
                </label>
                <select
                  id="lead"
                  value={newCategory.lead || ""}
                  onChange={(e) => handleInputChange("lead", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select Lead</option>
                  {leadOptions.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.Name}  {user.Post}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="coLead" className="block text-sm font-medium text-gray-700 mb-1">
                  Co-Lead
                </label>
                <select
                  id="coLead"
                  value={newCategory.coLead || ""}
                  onChange={(e) => handleInputChange("coLead", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">Select Co-Lead</option>
                  {coLeadOptions.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.Name} {user.Post}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-8 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditMode ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main ManageCategory Component
const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [leadOptions, setLeadOptions] = useState([]);
  const [coLeadOptions, setCoLeadOptions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);
  const [currentCategory, setCurrentCategory] = useState({
    title: "",
    description: "",
    lead: "",
    coLead: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(AppRoutes.category);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchAcceptedUsers = async () => {
    try {
      const res = await axios.get(AppRoutes.usersaccepted);
      if (res.data.success) {
        const users = [...res.data.data.lead, ...res.data.data.coLead];
        setAcceptedUsers(users);
        setLeadOptions(res.data.data.lead);
        setCoLeadOptions(res.data.data.coLead);
      }
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchAcceptedUsers();
    fetchCategories();
  }, []);

  const handleAddCategory = async (categoryData) => {
    try {
      const formData = new FormData();
      formData.append("title", categoryData.title);
      formData.append("description", categoryData.description || "");
      formData.append("lead", categoryData.lead || "");
      formData.append("coLead", categoryData.coLead || "");

      if (categoryData.cardImage) {
        formData.append("cardImage", categoryData.cardImage);
      }
      if (categoryData.bannerImage) {
        formData.append("bannerImage", categoryData.bannerImage);
      }

      // Debugging: Log FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      const response = await axios.post(AppRoutes.category, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        fetchCategories();
        setShowAddModal(false);
      }
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory({
      ...category,
      cardImage: null,
      bannerImage: null,
      cardImageUrl: category.cardImage,
      bannerImageUrl: category.bannerImage,
    });
    setShowEditModal(true);
  };

  const handleUpdateCategory = async (categoryData) => {
    try {
      const formData = new FormData();
      formData.append("title", categoryData.title);
      formData.append("description", categoryData.description || "");
      formData.append("lead", categoryData.lead || "");
      formData.append("coLead", categoryData.coLead || "");

      if (categoryData.cardImage instanceof File) {
        formData.append("cardImage", categoryData.cardImage);
      } else if (categoryData.cardImageUrl && !categoryData.cardImage) {
        // If we have an existing image URL and no new file
        formData.append("cardImageUrl", categoryData.cardImageUrl);
      }

      if (categoryData.bannerImage instanceof File) {
        formData.append("bannerImage", categoryData.bannerImage);
      } else if (categoryData.bannerImageUrl && !categoryData.bannerImage) {
        formData.append("bannerImageUrl", categoryData.bannerImageUrl);
      }

      // Debugging: Log FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.put(`${AppRoutes.category}/${categoryData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        fetchCategories();
        setShowEditModal(false);
      }
    } catch (err) {
      console.error("Error updating category", err);
    }
  };

  const handleDelete = (category) => {
    setSelectedCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${AppRoutes.category}/${selectedCategoryToDelete._id}`);
      fetchCategories();
      setShowDeleteModal(false);
      setSelectedCategoryToDelete(null);
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Category</h1>
        <div className="flex gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Lead</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Co-Lead</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories
              .filter((cat) => cat.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{cat.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.lead?.Name || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.coLead?.Name || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEditCategory(cat)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {categories.filter((cat) => cat.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <CategoryModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        isEditMode={false}
        initialCategory={{
          title: "",
          description: "",
          lead: "",
          coLead: "",
        }}
        leadOptions={leadOptions}
        coLeadOptions={coLeadOptions}
        handleAddCategory={handleAddCategory}
        handleUpdateCategory={handleUpdateCategory}
      />

      {/* Edit Modal */}
      <CategoryModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        isEditMode={true}
        initialCategory={currentCategory}
        leadOptions={leadOptions}
        coLeadOptions={coLeadOptions}
        handleAddCategory={handleAddCategory}
        handleUpdateCategory={handleUpdateCategory}
      />

      {/* Delete Modal */}
      {showDeleteModal && selectedCategoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Delete Category</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the category{" "}
              <span className="font-semibold text-gray-800">{selectedCategoryToDelete.title}</span>?
              <br />
              <span className="text-red-500 text-sm">This action cannot be undone.</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;