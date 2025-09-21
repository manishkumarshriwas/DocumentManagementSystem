import React from 'react';

const ShareModal = ({ show, onClose, showToastNotification }) => {
  if (!show) return null;

  const handleShare = () => {
    onClose();
    showToastNotification('Document shared successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full fade-in">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Share Document</h3>
          <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Share With</label>
            <div className="flex flex-wrap gap-2 mb-3">
              <button className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200">
                <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2">JD</div>
                John Doe
              </button>
              <button className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200">
                <div className="h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mr-2">JS</div>
                Jane Smith
              </button>
              <button className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200">
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mr-2">RJ</div>
                Robert Johnson
              </button>
            </div>
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Permission</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Can View</option>
              <option>Can Edit</option>
              <option>Can Comment</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
            <textarea 
              rows="3" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Add a message..."
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="px-4 py-2 gradient-primary text-white rounded-lg font-medium gradient-hover" onClick={handleShare}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;