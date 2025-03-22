// src/components/ThingsList.js
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
const ThingsList = () => {
  const [things, setThings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThings = async () => {
      try {
        setLoading(true);
        const response = await axios({
          url:'http://localhost:3000/api/stuff',
          method:'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });  
        if (!response.statusText === 'OK') {
          throw new Error(`Error: ${response.status}`);
        }
        const data = response.data;
        // console.log(data)
        setThings(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchThings();
  }, []);



  return (
    <div className="lg:ml-64 w-full p-4 pt-16 lg:pt-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Items</h1>
          <Link
            to="/add"
            className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-md font-medium transition duration-150 self-start sm:self-auto"
          >
            + Add New Thing
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        ) : things.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">No items found</h2>
            <p className="text-gray-500 mb-6">Start by adding a new item to your collection</p>
            <Link
              to="/add"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-medium transition duration-150"
            >
              Add Your First Thing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {things.map(thing => (
              <div key={thing._id} className="bg-white shadow rounded-lg overflow-hidden transition duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image preview section */}
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  {thing.imageUrl ? (
                    <img
                      src={thing.imageUrl}
                      alt={thing.title || 'Product image'}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product info section */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {thing.title || 'No Title'}
                  </h2>
                  <p className="text-gray-600 mb-3 line-clamp-2 h-12">
                    {thing.description || 'No description'}
                  </p>

                  {/* Price display if available */}
                  {
                    <p className="text-indigo-600 font-medium mb-3">
                      ${parseFloat(thing.price).toFixed(2)}
                    </p>
                  }
                </div>

                {/* Action buttons */}
                <div className="flex border-t border-gray-200">
                  <Link
                    to={`/things/${thing._id}`}
                    className="flex-1 text-center py-3 text-blue-500 hover:bg-blue-50 transition duration-150"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${thing._id}`}
                    className="flex-1 text-center py-3 text-indigo-500 hover:bg-indigo-50 transition duration-150"
                  >
                    Edit
                  </Link>
                  {/* <button 
                    onClick={() => handleDelete(thing._id)}
                    className="flex-1 text-center py-3 text-red-500 hover:bg-red-50 transition duration-150"
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThingsList;