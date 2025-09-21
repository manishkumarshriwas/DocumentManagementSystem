import React, { useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const Analytics = () => {
  useEffect(() => {
    // Initialize charts
  }, []);

  const docTypesData = {
    labels: ['PDFs', 'Documents', 'Images', 'Spreadsheets', 'Presentations', 'Archives'],
    datasets: [{
      label: 'Count',
      data: [436, 312, 187, 156, 98, 59],
      backgroundColor: [
        'rgba(239, 68, 68, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(249, 115, 22, 0.7)'
      ],
      borderColor: [
        'rgba(239, 68, 68, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(249, 115, 22, 1)'
      ],
      borderWidth: 1
    }]
  };

  const userActivityData = {
    labels: ['Uploads', 'Downloads', 'Shares', 'Views', 'Comments', 'Edits'],
    datasets: [
      {
        label: 'John Doe',
        data: [85, 90, 75, 80, 65, 70],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
      }, 
      {
        label: 'Jane Smith',
        data: [70, 85, 90, 75, 80, 65],
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
      }, 
      {
        label: 'Robert Johnson',
        data: [65, 75, 80, 70, 60, 85],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
      }
    ]
  };

  const storageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Storage Used (GB)',
      data: [12, 14, 16, 15, 18, 20, 19, 21, 23, 24, 25, 26],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const metrics = [
    { title: 'Total Uploads', value: '342', progress: 75, color: 'blue', icon: 'fa-upload' },
    { title: 'Total Downloads', value: '1,284', progress: 85, color: 'green', icon: 'fa-download' },
    { title: 'Total Shares', value: '526', progress: 60, color: 'purple', icon: 'fa-share-alt' },
    { title: 'Active Users', value: '18', progress: 45, color: 'yellow', icon: 'fa-users' },
  ];

  const topUsers = [
    { name: 'John Doe', initials: 'JD', uploads: 124, downloads: 456, shares: 89, storage: '8.4 GB' },
    { name: 'Jane Smith', initials: 'JS', uploads: 98, downloads: 324, shares: 67, storage: '6.2 GB' },
    { name: 'Robert Johnson', initials: 'RJ', uploads: 76, downloads: 287, shares: 54, storage: '5.1 GB' },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Analytics Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Document Analytics</h2>
        <p className="text-gray-600">Track your document usage and storage patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="progress-bar mt-2">
                  <div className={`progress-fill gradient-${metric.color}`} style={{ width: `${metric.progress}%` }}></div>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${metric.color}-100 text-${metric.color}-600`}>
                <i className={`fas ${metric.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 card-hover">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Document Types Distribution</h2>
          <div className="chart-container">
            <Chart type="bar" data={docTypesData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { font: { size: 11 } }
                },
                x: {
                  ticks: { font: { size: 11 } }
                }
              },
              plugins: {
                legend: { display: false }
              }
            }} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 card-hover">
          <h2 className="text-lg font-bold text-gray-800 mb-2">User Activity</h2>
          <div className="chart-container">
            <Chart type="radar" data={userActivityData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100,
                  ticks: { display: false }
                }
              },
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    boxWidth: 12,
                    padding: 10,
                    font: { size: 11 }
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Storage Usage Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 card-hover">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Storage Usage Over Time</h2>
        <div className="chart-container" style={{ height: '150px' }}>
          <Chart type="line" data={storageData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                ticks: { font: { size: 11 } }
              },
              x: {
                ticks: { font: { size: 11 } }
              }
            },
            plugins: {
              legend: { display: false }
            }
          }} />
        </div>
      </div>

      {/* Top Users Table */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Active Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage Used</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                        {user.initials}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.uploads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.downloads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.shares}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.storage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;