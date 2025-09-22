import React, { useState } from "react";

// Profile component to replace the existing Setting component
const Profile = ({ showToastNotification }) => {
    // State for modals
    const [showAdvancedModal, setShowAdvancedModal] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showDocumentPreview, setShowDocumentPreview] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    
    // Sample data
    const notifications = [
        { id: 1, text: "Your document was approved", time: "2 hours ago", read: false },
        { id: 2, text: "New collaboration request", time: "1 day ago", read: true },
        { id: 3, text: "Storage almost full", time: "3 days ago", read: true },
    ];
    
    // Handle document preview
    const handleDocumentPreview = (doc) => {
        setSelectedDocument(doc);
        setShowDocumentPreview(true);
    };
    
    // Handle save changes
    const handleSaveChanges = () => {
        showToastNotification("Profile updated successfully!");
    };
    
    // Handle save settings
    const handleSaveSettings = () => {
        showToastNotification("Settings saved successfully!");
    };
    
    return (
        <div className="w-full">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
                        <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
                    </div>
                    
                    {/* Notification Bell */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                            className="p-2 rounded-full hover:bg-gray-200 relative"
                        >
                            <span className="material-symbols-outlined text-gray-600">notifications</span>
                            {notifications.some(n => !n.read) && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                        
                        {/* Notification Dropdown */}
                        {showNotificationDropdown && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map(notification => (
                                        <div 
                                            key={notification.id} 
                                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                                        >
                                            <p className="text-gray-800">{notification.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center">
                                    <button className="text-sm text-primary-600 hover:text-primary-800">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information Section */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Profile Information</h2>
                        <button 
                            onClick={() => setShowAdvancedModal(true)}
                            className="text-sm text-primary-600 hover:text-primary-800"
                        >
                            Advanced Settings
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <span className="material-symbols-outlined text-white">
                                        photo_camera
                                    </span>
                                </div>
                            </div>
                            <button className="mt-2 text-sm text-primary-600 hover:text-primary-700">
                                Change Photo
                            </button>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value="Sarah"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value="Sarah@example.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        value="+91 8210022187"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={handleSaveChanges}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Account Settings Section */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Change Password</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Notification Preferences</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">SMS Notifications</p>
                                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={handleSaveSettings}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <span className="material-symbols-outlined text-blue-600">cloud_upload</span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Uploads</p>
                            <p className="text-xl font-bold">128</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center mr-4">
                            <span className="material-symbols-outlined text-green-600">download</span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Downloads</p>
                            <p className="text-xl font-bold">284</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                            <span className="material-symbols-outlined text-purple-600">folder</span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Storage Used</p>
                            <p className="text-xl font-bold">4.2 GB</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Advanced Settings Modal */}
            {showAdvancedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">Advanced Profile Settings</h3>
                                <button 
                                    onClick={() => setShowAdvancedModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Account ID
                                    </label>
                                    <input
                                        type="text"
                                        value="USR-789456"
                                        disabled
                                        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Two-Factor Authentication
                                    </label>
                                    <div className="flex items-center">
                                        <label className="relative inline-flex items-center cursor-pointer mr-3">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                        </label>
                                        <span className="text-sm text-gray-600">Enable 2FA for enhanced security</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Data Sharing Preferences
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                        <option>Allow data sharing with partners</option>
                                        <option>Share only with trusted partners</option>
                                        <option>Do not share any data</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Account Deletion
                                    </label>
                                    <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200">
                                        Request Account Deletion
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 flex justify-end">
                            <button 
                                onClick={() => setShowAdvancedModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 mr-2"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    setShowAdvancedModal(false);
                                    showToastNotification("Advanced settings saved successfully!");
                                }}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Document Preview Modal */}
            {showDocumentPreview && selectedDocument && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">{selectedDocument.name}</h3>
                                <button 
                                    onClick={() => setShowDocumentPreview(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-6xl text-gray-400">description</span>
                                    <p className="mt-4 text-gray-600">Document Preview</p>
                                    <p className="text-sm text-gray-500 mt-2">{selectedDocument.type} • {selectedDocument.size}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Last Modified: {selectedDocument.date}</p>
                                </div>
                                <div className="space-x-3">
                                    <button 
                                        onClick={() => {
                                            setShowDocumentPreview(false);
                                            showToastNotification(`Downloading ${selectedDocument.name}...`);
                                        }}
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                                    >
                                        Download
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setShowDocumentPreview(false);
                                            showToastNotification(`Share link for ${selectedDocument.name} copied to clipboard!`);
                                        }}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;