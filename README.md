Document Management System (DMS) – Front-End Interface
Overview

This project is the front-end implementation of a Document Management System (DMS) using ReactJS. It provides a user-friendly interface for uploading, tagging, searching, previewing, and downloading documents. The system is designed to work seamlessly with a .NET backend and MySQL database, but the focus of this repository is on the front-end functionality.

Features
1. Authentication and User Management

Login with OTP: Users log in via OTP verification. The backend provides a token upon OTP validation, which is used for subsequent requests.

Static Admin Interface: A simple form allows creation of new users with username and password.

Protected Routes: Access to the dashboard and other pages is restricted for unauthenticated users.

2. Dashboard and Navigation

Sidebar Navigation: Navigate between Dashboard, Upload Document, Search Documents, Analytics, Activity, User Management, Settings, and Help & Support pages.

Header Bar: Includes dark mode toggle, logout button, and quick access to sharing modal.

Dark Mode: Users can switch between light and dark themes.

3. File Upload

Date Picker: Select the date for document upload.

Category Selection: Dropdown to choose between Personal or Professional documents.

Dynamic Secondary Dropdown:

Personal → List of names (e.g., John, Tom, Emily)

Professional → List of departments (e.g., HR, IT, Finance, Accounts)

Tag Input: Users can add document tags as chips/tokens. Pre-existing tags are fetched from the backend; new tags are saved automatically.

Remarks Field: Optional text input for additional information.

File Restrictions: Only image and PDF files are allowed.

4. File Search

Search by Category, Tags, and Date Range: Allows filtering of documents based on user input.

Dynamic Results: Displays matching documents with options for preview or download.

5. File Preview and Download

Preview Supported Files: Simulated preview for PDFs and images.

Unsupported File Types: Displays a notification if a file type cannot be previewed.

Download Options: Users can download individual files or all results as a ZIP.

6. Modals and Notifications

Preview Modal: View documents without leaving the page.

Share Modal: Share files directly from the dashboard.

Toast Notifications: Inform users about success/failure events (e.g., file uploaded, logout).

Project Structure
src/
│
├─ components/
│  ├─ Header.jsx
│  ├─ Sidebar.jsx
│  ├─ Dashboard.jsx
│  ├─ UploadDocument.jsx
│  ├─ SearchDocuments.jsx
│  ├─ Analytics.jsx
│  ├─ Activity.jsx
│  ├─ ManageUsers.jsx
│  ├─ Setting.jsx
│  ├─ HelpSupport.jsx
│  ├─ PreviewModal.jsx
│  ├─ ShareModal.jsx
│  └─ SuccessToast.jsx
│
├─ context/
│  └─ AuthContext.jsx
│
├─ styles/
│  └─ global.css
│
├─ App.jsx
└─ index.js

Installation & Setup

Clone the repository

git clone https://github.com/manishkumarshriwas/DocumentManagementSystem.git
cd DocumentManagementSystem


Install dependencies

npm install


Start the development server

npm start


The app will run at http://localhost:3000.

Ensure the backend APIs are running and accessible for authentication, file upload, and tag fetching.

Usage

Login with your mobile number and OTP.

Upload documents using the Upload Document page. Select category, secondary dropdown, tags, remarks, and file.

Search documents by category, tags, and date range.

Preview or download files from the search results.

Use sidebar navigation to explore Analytics, Activity logs, User Management, Settings, and Help & Support.

Toggle dark mode from the header bar for better accessibility.

Tech Stack

Front-End: ReactJS, TailwindCSS

Routing: react-router-dom

State Management: React Context API

UI Components: Custom modals, toast notifications, date pickers, dropdowns

Notes

File upload supports only images and PDFs.

Tag input dynamically fetches existing tags and allows creating new ones.

Some features (e.g., ZIP download) are simulated for frontend demonstration purposes.

The backend API endpoints are required for full functionality (authentication, tag management, and document storage).

Author

Manish Kumar

GitHub: https://github.com/manishkumarshriwas

Front-End Developer – Document Management System Assignment
