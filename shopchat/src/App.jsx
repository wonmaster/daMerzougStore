import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThingsList from './components/ThingsList';
import ThingForm from './components/ThingForm';
import ThingDetail from './components/ThingDetail';
import RealtimeChatComponent from './components/RealtimeChatComponent';
import SignInPage from './components/SignIn';
import RegisterPage from './components/Register';
import ProtectedRoute from './components/ProtectedRoutes';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={
            <div className="flex min-h-screen min-w-screen bg-gray-100">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route index element={<ThingsList />} />
                  <Route path="/add" element={<ThingForm />} />
                  <Route path="/edit/:id" element={<ThingForm />} />
                  <Route path="/things/:id" element={<ThingDetail />} />
                </Routes>
              </div>
              <RealtimeChatComponent />
            </div>
          }>
            <Route index element={<ThingsList />} />
            <Route path="/add" element={<ThingForm />} />
            <Route path="/edit/:id" element={<ThingForm />} />
            <Route path="/things/:id" element={<ThingDetail />} />
          </Route>
        </Route>
        
        {/* Redirect any undefined routes to root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
