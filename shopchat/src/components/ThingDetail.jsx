// src/components/ThingDetail.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ThingDetail = () => {
  const [thing, setThing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThing = async () => {
      try {
        setLoading(true);
        const response = await axios({
          url:`http://localhost:3000/api/stuff/${id}`,
          method:'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          } 
          });
        if (!response.statusText === 'OK') {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.data;
        setThing(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching thing:", err);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchThing();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await axios({
          url: `http://localhost:3000/api/stuff/${id}`,
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.statusText === 'OK') {
          throw new Error(`Error: ${response.status}`);
        }

        navigate('/');
      } catch (err) {
        setError('Error deleting item.');
      }
    }
  };

  return (
    <div className="ml-64 flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        ) : !thing ? (
          <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-xl text-gray-600">Item not found</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                {thing.title || 'No Title'}
              </h1>
              <div className="flex space-x-4">
                <Link 
                  to="/" 
                  className="inline-flex items-center text-gray-600 hover:text-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to List
                </Link>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-600 mb-3">Description</h2>
                  <p className="text-gray-700">
                    {thing.description || 'No description provided'}
                  </p>
                </div>
                
                {thing.imageUrl && (
                  <div className="mb-8">
                    <h2 className="text-lg font-medium text-gray-600 mb-3">Image</h2>
                    <div className="rounded-lg overflow-hidden max-w-lg">
                      <img 
                        src={thing.imageUrl} 
                        alt={thing.title || 'Item'} 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
                
                {thing.price !== undefined && (
                  <div className="mb-8">
                    <h2 className="text-lg font-medium text-gray-600 mb-3">Price</h2>
                    <p className="text-2xl font-semibold text-green-600">
                      ${parseFloat(thing.price).toFixed(2)}
                    </p>
                  </div>
                )}
                
                {thing.userId && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-600 mb-3">Created By</h2>
                    <p className="text-gray-700">
                      User ID: {thing.userId}
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-between">
                <Link 
                  to={`/edit/${thing._id}`} 
                  className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-md font-medium transition duration-150 self-start sm:self-auto"
                >
                  Edit
                </Link>
                <button 
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition duration-150"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThingDetail;