import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignInPage = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      
      axios.post('http://localhost:3000/api/auth/login', {
        email:username,
        password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.token}`};
        localStorage.setItem('userId', response.data.userId);
        setIsLoading(false);
        navigate('/');
      })
      
    } catch (err) {
      setError('Invalid username or password. Please try again.');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-8 text-center">
          <a href='/'><h2 className="text-3xl font-bold text-blue-600">Things Shop</h2></a>
          <p className="text-gray-600 mt-2">Sign in to start chatting</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <p className="mt-2 text-sm text-right">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 rounded-md text-white font-medium ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;