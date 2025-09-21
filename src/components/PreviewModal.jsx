import React from 'react';

const PreviewModal = ({ show, onClose, file, openShareModal }) => {
  if (!show) return null;

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'fa-file-pdf';
      case 'doc': return 'fa-file-word';
      case 'img': return 'fa-file-image';
      default: return 'fa-file-alt';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf': return 'file-pdf';
      case 'doc': return 'file-doc';
      case 'img': return 'file-img';
      default: return 'file-txt';
    }
  };

  const getFileInfo = (type) => {
    switch (type) {
      case 'pdf': return 'PDF Document • 2.4 MB • Last modified: Nov 15, 2023';
      case 'img': return 'JPEG Image • 4.2 MB • Last modified: Nov 5, 2023';
      case 'doc': return 'Word Document • 1.8 MB • Last modified: Nov 10, 2023';
      default: return 'Unknown File Type • 0.5 MB • Last modified: Nov 1, 2023';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col fade-in">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Document Preview</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200">
              <i className="fas fa-download"></i>
            </button>
            <button className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">
              <i className="fas fa-file-archive"></i>
            </button>
            <button 
              className="p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200"
              onClick={openShareModal}
            >
              <i className="fas fa-share-alt"></i>
            </button>
            <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <i className={`fas ${getFileIcon(file.type)} ${getFileColor(file.type)} text-6xl mx-auto mb-4`}></i>
            <p className="text-gray-600">Preview would appear here</p>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <div className="text-sm text-gray-600">
            {getFileInfo(file.type)}
          </div>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;