import React, { useState } from 'react';

const Header = ({ darkMode, toggleDarkMode, openShareModal }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <header className="bg-white shadow-sm z-10 transition-colors duration-300">
      <div className="flex items-center justify-between p-4">
        <div className="relative w-64">
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <div className="flex items-center">
            <i className="fas fa-sun text-yellow-500 mr-2"></i>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="toggle-slider"></span>
            </label>
            <i className="fas fa-moon text-gray-600 ml-2"></i>
          </div>
          
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
          
          <div className="relative">
            <button 
              id="userDropdownToggle" 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleUserDropdown}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <span className="hidden md:block text-gray-700">Sarah</span>
            </button>
            
            {showUserDropdown && (
              <div id="userDropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-user mr-2"></i> Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-cog mr-2"></i> Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-question-circle mr-2"></i> Help
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;