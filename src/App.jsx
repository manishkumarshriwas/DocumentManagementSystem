// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Login from './components/Login';

// import Dashboard from './components/Dashboard';
// import UploadDocument from './components/UploadDocument';
// import SearchDocuments from './components/SearchDocuments';
// import Analytics from './components/Analytics';
// import Activity from './components/Activity';
// import ManageUsers from './components/ManageUsers';
// import PreviewModal from './components/PreviewModal';
// import ShareModal from './components/ShareModal';
// import SuccessToast from './components/SuccessToast';
// import Setting from './components/Setting';
// import HelpSupport from './components/HelpSupport';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import './styles/global.css';

// function ProtectedLayout({ children }) {
//   const { isAuthenticated, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }

// function AppContent() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [previewFile, setPreviewFile] = useState({ name: '', type: '' });
//   const location = useLocation();
//   const { logout } = useAuth();

//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add('dark-mode');
//     } else {
//       document.body.classList.remove('dark-mode');
//     }
//   }, [darkMode]);

//   useEffect(() => {
//     // Update currentPage based on URL
//     const path = location.pathname.substring(1); // Remove leading slash
//     if (path && ['dashboard', 'upload', 'search', 'analytics', 'activity', 'users', 'setting', 'help'].includes(path)) {
//       setCurrentPage(path);
//     } else {
//       setCurrentPage('dashboard');
//     }
//   }, [location]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const openPreviewModal = (fileName, fileType) => {
//     setPreviewFile({ name: fileName, type: fileType });
//     setShowPreviewModal(true);
//   };

//   const closePreviewModal = () => {
//     setShowPreviewModal(false);
//   };

//   const openShareModal = () => {
//     setShowShareModal(true);
//   };

//   const closeShareModal = () => {
//     setShowShareModal(false);
//   };

//   const showToastNotification = (message) => {
//     setToastMessage(message);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const navigateToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const handleLogout = () => {
//     logout();
//     showToastNotification('You have been logged out successfully');
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50">
//       <Sidebar currentPage={currentPage} setCurrentPage={navigateToPage} />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header 
//           darkMode={darkMode} 
//           toggleDarkMode={toggleDarkMode} 
//           openShareModal={openShareModal}
//           onLogout={handleLogout}
//         />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <Routes>
//             <Route path="/" element={<Dashboard openPreviewModal={openPreviewModal} />} />
//             <Route path="/dashboard" element={<Dashboard openPreviewModal={openPreviewModal} />} />
//             <Route path="/upload" element={<UploadDocument showToastNotification={showToastNotification} />} />
//             <Route path="/search" element={<SearchDocuments openPreviewModal={openPreviewModal} />} />
//             <Route path="/analytics" element={<Analytics />} />
//             <Route path="/activity" element={<Activity />} />
//             <Route path="/setting" element={<Setting />} />
//             <Route path="/users" element={<ManageUsers showToastNotification={showToastNotification} />} />
//             <Route path="/help" element={<HelpSupport />} />
//           </Routes>
//         </main>
//       </div>

//       <PreviewModal 
//         show={showPreviewModal} 
//         onClose={closePreviewModal} 
//         file={previewFile}
//         openShareModal={openShareModal}
//       />
      
//       <ShareModal 
//         show={showShareModal} 
//         onClose={closeShareModal} 
//         showToastNotification={showToastNotification}
//       />
      
//       <SuccessToast 
//         show={showToast} 
//         message={toastMessage} 
//       />
//     </div>
//   );
// }


// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }


// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={
//             <ProtectedLayout>
//               <AppContent />
//             </ProtectedLayout>
//           } />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;



// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UploadDocument from './components/UploadDocument';
import SearchDocuments from './components/SearchDocuments';
import Analytics from './components/Analytics';
import Activity from './components/Activity';
import ManageUsers from './components/ManageUsers';
import PreviewModal from './components/PreviewModal';
import ShareModal from './components/ShareModal';
import SuccessToast from './components/SuccessToast';
import Profile from './components/Profile';
import Setting from './components/Setting'; // Import the new Settings component
import HelpSupport from './components/HelpSupport';
import './styles/global.css';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [previewFile, setPreviewFile] = useState({ name: '', type: '' });
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path && ['dashboard', 'upload', 'search', 'analytics', 'activity', 'users', 'profile', 'setting', 'help'].includes(path)) {
      setCurrentPage(path);
    } else {
      setCurrentPage('dashboard');
    }
  }, [location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openPreviewModal = (fileName, fileType) => {
    setPreviewFile({ name: fileName, type: fileType });
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => setShowPreviewModal(false);

  const openShareModal = () => setShowShareModal(true);

  const closeShareModal = () => setShowShareModal(false);

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    showToastNotification('Logging out...');
    // In a real app, you would clear authentication tokens and redirect to login page
    // For now, we'll just show a notification
    setTimeout(() => {
      // Redirect to login page or home page
      window.location.href = '/';
    }, 1500);
  };

  const navigateToPage = (page) => setCurrentPage(page);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={navigateToPage} 
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard openPreviewModal={openPreviewModal} />} />
            <Route path="/dashboard" element={<Dashboard openPreviewModal={openPreviewModal} />} />
            <Route path="/upload" element={<UploadDocument showToastNotification={showToastNotification} />} />
            <Route path="/search" element={<SearchDocuments openPreviewModal={openPreviewModal} />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile showToastNotification={showToastNotification} />} />
            <Route path="/setting" element={<Setting showToastNotification={showToastNotification} />} />
            <Route path="/users" element={<ManageUsers showToastNotification={showToastNotification} />} />
            <Route path="/help" element={<HelpSupport />} />
          </Routes>
        </main>
      </div>

      <PreviewModal 
        show={showPreviewModal} 
        onClose={closePreviewModal} 
        file={previewFile}
        openShareModal={openShareModal}
      />
      
      <ShareModal 
        show={showShareModal} 
        onClose={closeShareModal} 
        showToastNotification={showToastNotification}
      />
      
      <SuccessToast 
        show={showToast} 
        message={toastMessage} 
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;