import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const navItems = [
    { id: 'dashboard', icon: 'fa-home', label: 'Dashboard' },
    { id: 'upload', icon: 'fa-upload', label: 'Upload Document' },
    { id: 'search', icon: 'fa-search', label: 'Search Documents' },
    { id: 'analytics', icon: 'fa-chart-bar', label: 'Analytics' },
    { id: 'activity', icon: 'fa-history', label: 'Activity' },
    { id: 'users', icon: 'fa-users', label: 'Manage Users' },
  ];

  const bottomNavItems = [
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
    { id: 'setting', icon: 'fa-cog', label: 'Settings' },
    { id: 'logout', icon: 'fa-sign-out-alt', label: 'Logout' },
  ];

  return (
    <div id="sidebar" className={`bg-gradient-to-b from-blue-800 to-indigo-900 text-white transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h1 className="text-xl font-bold">DocManager</h1>}
        <button 
          id="sidebarToggle" 
          className="p-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={toggleSidebar}
        >
          <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigateToPage(item.id)}
                className={`nav-link flex items-center p-4 text-left w-full ${
                  currentPage === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'
                } transition-colors`}
              >
                <i className={`fas ${item.icon} text-xl w-6`}></i>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <ul>
          {bottomNavItems.map((item) => (
            <li key={item.id}>
              <button className="flex items-center p-4 text-left w-full hover:bg-blue-700 transition-colors">
                <i className={`fas ${item.icon} text-xl w-6`}></i>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;





// import React from "react";
// import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

// const Sidebar = () => {
//   return (
//     <header className="w-full bg-white border-b shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
//         {/* Left: Logo & Nav */}
//         <div className="flex items-center gap-8">
//           <div className="text-xl font-extrabold text-blue-600">DMS</div>
//           <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
//             <a href="/dahboard" className="hover:text-blue-600">Dashboard</a>
//             <a href="/upload" className="hover:text-blue-600">Upload Document</a>
//             <a href="/search" className="hover:text-blue-600">Search Document</a>
//             <a href="/report" className="hover:text-blue-600">Reports</a>
//             <a href="/analytics" className="hover:text-blue-600">Invoices</a>
//           </nav>
//         </div>

//         {/* Right: Search, Notifications, Profile */}
//         <div className="flex items-center gap-4">
//           {/* Search */}
//           <div className="relative hidden sm:block">
//             <input
//               type="text"
//               aria-label="Search"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" aria-hidden="true" />
//           </div>

//           {/* Notifications */}
//           <button aria-label="Notifications" className="relative p-2 rounded-md hover:bg-gray-100">
//             <BellIcon className="w-6 h-6 text-gray-600" />
//             <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full" />
//           </button>

//           {/* Profile */}
//           <button className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-100">
//             <img
//               src="https://via.placeholder.com/40"
//               alt="User Avatar"
//               className="w-8 h-8 rounded-full"
//             />
//             <span className="hidden sm:block font-medium text-gray-700">John Doe</span>
//             <ChevronDownIcon className="w-4 h-4 text-gray-500" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Sidebar;
