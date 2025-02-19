import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import { Link, useNavigate } from "react-router-dom"; // If using React Router
import { AppContent } from "../context/AppContext";
import axios from "axios";
import logo from '../assets/eventify-logo.png'
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null); // Clear user data on logout
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || error.message);
    }
  };

  return (
    <div className="w-full p-6 sm:p-6 sm:px-24 bg-gradient-to-br from-blue-200 to-purple-400 absolute top-0 flex justify-between items-center">
      {/* Logo */}
   
    
      <h1 onClick={() => navigate('/')} className="text-3xl cursor-pointer font-bold">eventify</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center gap-6">
        {/* Show Dashboard button only if the user is logged in */}
        {userData ? (
          <div className="btn">
            <button
              onClick={() => navigate('/admin-panel')}
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-sans rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              Admin Panel
            </button>
          </div>
        ) : null}

        {/* Show Login button when user is not logged in */}
        {userData ? (
          <div className="w-8 cursor-pointer h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                {!userData.isAccountVerified && (
                  <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Verify Email</li>
                )}
                <li onClick={logout} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Logout</li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-semibold rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => {
        setIsOpen(!isOpen);
        // console.log("Is Open:", !isOpen); // Debugging line to check state change
      }}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-0 mt-16 left-0 w-full h-full bg-black opacity-80 text-white flex flex-col items-center justify-center z-50">
          <Link to="/admin-panel" className="py-2 px-4 text-lg" onClick={() => setIsOpen(false)}>Admin Panel</Link>
          {userData ? (
            <div className="flex  flex-col items-center">
              {!userData.isAccountVerified && (
                <button onClick={sendVerificationOtp} className="py-2 px-4 text-lg mb-2">Verify Email</button>
              )}
              <button onClick={logout} className="py-2 px-4 text-lg">Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="py-2 px-4 text-lg">Login</button>
          )}
        </div>
      )}

    </div>
  );
};

export default Navbar;
