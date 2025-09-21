import React, { useState } from 'react';

const Setting = () => {
  const [setting, setSetting] = useState({
    systemName: 'DocuManage',
    storageLimit: '10',
    allowedFileTypes: '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx',
    maxFileSize: '10'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSetting(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setSetting({
      systemName: 'DocuManage',
      storageLimit: '10',
      allowedFileTypes: '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx',
      maxFileSize: '10'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
        System Settings
      </h1>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
                <input
                  type="text"
                  name="systemName"
                  value={setting.systemName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage Limit (GB)</label>
                <input
                  type="number"
                  name="storageLimit"
                  value={setting.storageLimit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
                <input
                  type="text"
                  name="allowedFileTypes"
                  value={setting.allowedFileTypes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <p className="mt-1 text-xs text-gray-500">Separate file types with commas (e.g., .pdf,.jpg,.png)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                <input
                  type="number"
                  name="maxFileSize"
                  value={setting.maxFileSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;