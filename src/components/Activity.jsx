import React from 'react';
import { activityData } from '../data';

const Activity = () => {
  const getActionIcon = (action) => {
    switch (action) {
      case 'uploaded': return 'fa-upload';
      case 'downloaded': return 'fa-download';
      case 'shared': return 'fa-share-alt';
      case 'edited': return 'fa-edit';
      case 'deleted': return 'fa-trash';
      default: return 'fa-file';
    }
  };

  const getGradientColor = (color) => {
    switch (color) {
      case 'blue': return 'linear-gradient(135deg, #3b82f6, #6366f1)';
      case 'purple': return 'linear-gradient(135deg, #8b5cf6, #ec4899)';
      case 'green': return 'linear-gradient(135deg, #10b981, #14b8a6)';
      case 'yellow': return 'linear-gradient(135deg, #f59e0b, #f97316)';
      case 'red': return 'linear-gradient(135deg, #ef4444, #f43f5e)';
      default: return 'linear-gradient(135deg, #3b82f6, #6366f1)';
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Activity Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Activity Timeline</h2>
        <p className="text-gray-600">Track all document activities and changes</p>
      </div>

      {/* Activity Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors">
            <i className="fas fa-filter mr-2"></i> All Activities
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            <i className="fas fa-upload mr-2"></i> Uploads
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            <i className="fas fa-download mr-2"></i> Downloads
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            <i className="fas fa-share-alt mr-2"></i> Shares
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            <i className="fas fa-edit mr-2"></i> Edits
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        {activityData.map((activity, index) => (
          <div key={activity.id} className="timeline-item">
            <div className="timeline-dot" style={{ background: getGradientColor(activity.color) }}></div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{activity.user} {activity.action} a new document</h3>
                  <p className="text-sm text-gray-600 mt-1">{activity.document}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              <div className="flex items-center mt-3 text-sm text-gray-500">
                <div className={`h-6 w-6 rounded-full bg-${activity.color}-500 flex items-center justify-center text-white text-xs font-bold mr-2`}>
                  {activity.userInitials}
                </div>
                {activity.category && activity.tags && (
                  <span>{activity.category} • {activity.tags.join(', ')}</span>
                )}
                {activity.sharedWith && (
                  <span>Shared with: {activity.sharedWith.join(', ')}</span>
                )}
                {activity.from && (
                  <span>From: {activity.from}</span>
                )}
                {activity.version && (
                  <span>Version updated: {activity.version}</span>
                )}
                {activity.reason && (
                  <span>Reason: {activity.reason}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;