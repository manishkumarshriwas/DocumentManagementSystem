import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto p-6">
      {/* Dashboard Welcome Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, Sarah!</h2>
          <p className="text-gray-600 flex items-center">
            <span className="material-symbols-outlined text-green-500 mr-1 text-sm">
              circle
            </span>
            Last login: Today at 09:24 AM
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center">
            <span className="material-symbols-outlined mr-2">analytics</span>
            Reports
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 flex items-center">
            <span className="material-symbols-outlined mr-2">upload_file</span>
            Upload
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary-500 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Documents</p>
              <h3 className="text-2xl font-bold text-gray-800">347</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">
                  trending_up
                </span>
                12% increase this month
              </p>
            </div>
            <div className="bg-primary-50 p-3 rounded-full">
              <span className="material-symbols-outlined text-primary-500 text-2xl">
                folder
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Recent Uploads</p>
              <h3 className="text-2xl font-bold text-gray-800">24</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">
                  trending_up
                </span>
                8% increase this week
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <span className="material-symbols-outlined text-blue-500 text-2xl">
                upload_file
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Shared With Me</p>
              <h3 className="text-2xl font-bold text-gray-800">48</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">
                  trending_up
                </span>
                15% increase this month
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-full">
              <span className="material-symbols-outlined text-amber-500 text-2xl">
                folder_shared
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Storage Used</p>
              <h3 className="text-2xl font-bold text-gray-800">64%</h3>
              <p className="text-xs text-amber-600 mt-1 flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">warning</span>
                36% available
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <span className="material-symbols-outlined text-purple-500 text-2xl">
                storage
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl shadow-sm border border-primary-200 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-white text-primary-500 rounded-lg shadow-sm mr-4">
              <span className="material-symbols-outlined text-2xl">cloud_upload</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">Quick Upload</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Upload documents quickly and easily with our streamlined process.
          </p>

          <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer group-hover:border-primary-500 transition-all duration-300 bg-white bg-opacity-60 mb-4">
            <span className="material-symbols-outlined text-2xl text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              upload_file
            </span>
            <p className="text-sm text-gray-500">
              Drag & drop files here or click to browse
            </p>
          </div>

          <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 flex items-center justify-center">
            <span className="material-symbols-outlined mr-2">add</span>
            Upload Files
          </button>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-lg">Recent Activity</h3>
            <a
              href="#"
              className="text-primary-600 text-sm hover:text-primary-800 transition-colors duration-200 flex items-center"
            >
              View All
              <span className="material-symbols-outlined ml-1 text-sm">
                chevron_right
              </span>
            </a>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <span className="material-symbols-outlined text-green-600">
                  upload_file
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  You uploaded{" "}
                  <span className="font-medium">Q3 Financial Report.pdf</span>
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <span className="material-symbols-outlined text-blue-600">share</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Mark shared{" "}
                  <span className="font-medium">Project X Proposal.docx</span> with
                  you
                </p>
                <p className="text-xs text-gray-500">Yesterday at 4:30 PM</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <span className="material-symbols-outlined text-amber-600">edit</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  You edited{" "}
                  <span className="font-medium">Employee Handbook.pdf</span>
                </p>
                <p className="text-xs text-gray-500">Oct 15, 2023</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <span className="material-symbols-outlined text-purple-600">
                  folder
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  You created folder{" "}
                  <span className="font-medium">Marketing Materials</span>
                </p>
                <p className="text-xs text-gray-500">Oct 14, 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tag Cloud */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-lg">Popular Tags</h3>
            <a
              href="#"
              className="text-primary-600 text-sm hover:text-primary-800 transition-colors duration-200"
            >
              Manage Tags
            </a>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm hover:bg-blue-200 cursor-pointer transition-all duration-200 flex items-center">
              Finance
              <span className="ml-1 text-xs text-blue-600 bg-blue-200 rounded-full px-1.5">
                42
              </span>
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm hover:bg-green-200 cursor-pointer transition-all duration-200 flex items-center">
              Legal
              <span className="ml-1 text-xs text-green-600 bg-green-200 rounded-full px-1.5">
                36
              </span>
            </span>
            <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-sm hover:bg-amber-200 cursor-pointer transition-all duration-200 flex items-center">
              ProjectX
              <span className="ml-1 text-xs text-amber-600 bg-amber-200 rounded-full px-1.5">
                28
              </span>
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm hover:bg-purple-200 cursor-pointer transition-all duration-200 flex items-center">
              HR
              <span className="ml-1 text-xs text-purple-600 bg-purple-200 rounded-full px-1.5">
                24
              </span>
            </span>
            <span className="bg-rose-100 text-rose-700 px-3 py-1.5 rounded-full text-sm hover:bg-rose-200 cursor-pointer transition-all duration-200 flex items-center">
              Marketing
              <span className="ml-1 text-xs text-rose-600 bg-rose-200 rounded-full px-1.5">
                19
              </span>
            </span>
            <span className="bg-cyan-100 text-cyan-700 px-3 py-1.5 rounded-full text-sm hover:bg-cyan-200 cursor-pointer transition-all duration-200 flex items-center">
              Reports
              <span className="ml-1 text-xs text-cyan-600 bg-cyan-200 rounded-full px-1.5">
                16
              </span>
            </span>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-sm hover:bg-indigo-200 cursor-pointer transition-all duration-200 flex items-center">
              Tax
              <span className="ml-1 text-xs text-indigo-600 bg-indigo-200 rounded-full px-1.5">
                14
              </span>
            </span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm hover:bg-emerald-200 cursor-pointer transition-all duration-200 flex items-center">
              Contracts
              <span className="ml-1 text-xs text-emerald-600 bg-emerald-200 rounded-full px-1.5">
                12
              </span>
            </span>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Add a new tag</h4>
            <div className="flex">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="Enter tag name..."
              />
              <button className="bg-primary-600 text-white px-3 py-2 rounded-r-lg hover:bg-primary-700 transition-all duration-200">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 text-lg">Recent Documents</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">
                  filter_alt
                </span>
              </span>
              <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm appearance-none bg-white">
                <option>All Types</option>
                <option>PDF Documents</option>
                <option>Word Documents</option>
                <option>Image Files</option>
              </select>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <span className="material-symbols-outlined">sort</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Uploaded
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-all duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-red-500 mr-3 p-1.5 bg-red-50 rounded">
                      description
                    </span>
                    <span className="font-medium text-gray-900">
                      Q3 Financial Report.pdf
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700">
                    Professional
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      Finance
                    </span>
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">
                      Q3
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Oct 15, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-1 hover:bg-indigo-50 rounded">
                      <span className="material-symbols-outlined text-sm">
                        visibility
                      </span>
                    </button>
                    <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200 p-1 hover:bg-primary-50 rounded">
                      <span className="material-symbols-outlined text-sm">
                        download
                      </span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-1 hover:bg-gray-50 rounded">
                      <span className="material-symbols-outlined text-sm">
                        share
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;