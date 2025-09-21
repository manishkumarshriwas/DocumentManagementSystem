import React, { useState, useEffect } from 'react';
import { searchResults as initialSearchResults } from '../data';

const SearchDocuments = ({ openPreviewModal }) => {
  const [searchResults, setSearchResults] = useState(initialSearchResults);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const handleSearch = () => {
    let results = initialSearchResults;
    
    if (searchQuery) {
      results = results.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      results = results.filter(doc => doc.category === selectedCategory);
    }
    
    setSearchResults(results);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'fa-file-pdf';
      case 'doc':
      case 'docx': return 'fa-file-word';
      case 'xls':
      case 'xlsx': return 'fa-file-excel';
      case 'ppt':
      case 'pptx': return 'fa-file-powerpoint';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'fa-file-image';
      case 'txt': return 'fa-file-alt';
      case 'zip':
      case 'rar': return 'fa-file-archive';
      default: return 'fa-file';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf': return 'file-pdf';
      case 'doc':
      case 'docx': return 'file-doc';
      case 'xls':
      case 'xlsx': return 'file-xls';
      case 'ppt':
      case 'pptx': return 'file-ppt';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'file-img';
      case 'txt': return 'file-txt';
      case 'zip':
      case 'rar': return 'file-zip';
      default: return '';
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 fade-in">
      {/* Search Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Documents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <input 
                type="text" 
                id="searchInput" 
                placeholder="Search documents..." 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <select 
              id="searchCategory" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          
          <div>
            <button 
              id="searchButton" 
              className="w-full gradient-primary text-white py-3 rounded-lg font-medium gradient-hover shadow-md flex items-center justify-center"
              onClick={handleSearch}
            >
              <i className="fas fa-search mr-2"></i> Search
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:from-blue-200 hover:to-indigo-200 transition-all">
            <i className="fas fa-filter mr-1"></i> PDFs
          </button>
          <button className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 hover:from-purple-200 hover:to-pink-200 transition-all">
            <i className="fas fa-filter mr-1"></i> Images
          </button>
          <button className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-teal-100 text-green-800 hover:from-green-200 hover:to-teal-200 transition-all">
            <i className="fas fa-filter mr-1"></i> Last 7 Days
          </button>
          <button className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 hover:from-yellow-200 hover:to-orange-200 transition-all">
            <i className="fas fa-filter mr-1"></i> Shared With Me
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Advanced Filters</h3>
          <button className="text-blue-500 hover:text-blue-700 text-sm">Reset Filters</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="flex space-x-2">
              <input type="date" className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <span className="self-center text-gray-500">to</span>
              <input type="date" className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">File Size</label>
            <div className="flex space-x-2">
              <select className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Any Size</option>
                <option>&lt; 1 MB</option>
                <option>1-10 MB</option>
                <option>&gt; 10 MB</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Any Owner</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Robert Johnson</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Search Results</h2>
          <div className="flex gap-2">
            <button 
              id="gridViewBtn" 
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} hover:bg-blue-200`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
            <button 
              id="listViewBtn" 
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>

        <div id="searchResults" className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
          {searchResults.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <i className="fas fa-search text-gray-400 text-4xl mb-3"></i>
              <p className="text-gray-600">No documents found matching your search criteria</p>
            </div>
          ) : (
            searchResults.map(doc => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow card-hover">
                <div className="flex items-start">
                  <i className={`fas ${getFileIcon(doc.type)} ${getFileColor(doc.type)} text-2xl`}></i>
                  <div className="ml-3 flex-grow">
                    <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.date}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{tag}</span>
                      ))}
                    </div>
                    {doc.shared && doc.sharedWith.length > 0 && (
                      <div className="flex -space-x-2 mt-2">
                        {doc.sharedWith.slice(0, 3).map((user, index) => (
                          <div key={index} className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">{user}</div>
                        ))}
                        {doc.sharedWith.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-bold border-2 border-white">+{doc.sharedWith.length - 3}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    className="preview-btn p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200" 
                    onClick={() => openPreviewModal(doc.name, doc.type)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="share-btn p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200">
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button className="download-btn p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDocuments;