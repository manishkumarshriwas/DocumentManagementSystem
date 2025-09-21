import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tags, setTags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  }

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      tags, setTags,
      selectedFiles, setSelectedFiles,
      previewFile, setPreviewFile,
      shareOpen, setShareOpen,
      toastMessage, showToast
    }}>
      {children}
    </AppContext.Provider>
  )
}
