// src/components/ThingForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ThingForm = () => {
  const initialFormState = {
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    userId: localStorage.getItem('userId')
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchThing(id);
    } else {
      setFormData(initialFormState);
      setIsEdit(false);
    }
  }, [id]);

  const fetchThing = async (thingId) => {
    try {
      setLoading(true);
      const response = await axios({
        url: `http://localhost:3000/api/stuff/${thingId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }

      );
      // axios.get(`http://localhost:3000/api/stuff/${thingId}`)
      if (!response.statusText === 'OK') {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.data;
      setFormData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching thing:", err);
      setError('Error loading data. Please try again later.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const url = isEdit
        ? `http://localhost:3000/api/stuff/${id}`
        : 'http://localhost:3000/api/stuff';
      
      const method = isEdit ? 'put' : 'post';
      
      // Using axios instead of fetch
      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: formData  // axios uses 'data' instead of 'body'
      });
      
      // Axios automatically throws for error status codes, 
      // and response data is in response.data
      navigate('/');
      
    } catch (err) {
      console.error("Error submitting form:", err);
      
      // More detailed error handling with axios
      const errorMessage = err.response 
        ? `Error: ${err.response.status} - ${err.response.data.message || 'Something went wrong'}`
        : `Error ${isEdit ? 'updating' : 'creating'} item. Please try again.`;
      
      setError(errorMessage);
      setSubmitting(false);
    }
  };
  

  return (
    <div className="ml-64 flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          {isEdit ? 'Edit Thing' : 'Add New Thing'}
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="4"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    className=" text-black w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                <Link 
                  to="/" 
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-150"
                >
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    submitting 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-500 hover:bg-indigo-600'
                  } transition duration-150`}
                  disabled={submitting}
                >
                  {submitting 
                    ? 'Saving...' 
                    : isEdit ? 'Update Thing' : 'Create Thing'
                  }
                </button>

              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ThingForm;