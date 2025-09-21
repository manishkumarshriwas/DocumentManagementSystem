import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import FileUpload from '../components/FileUpload';
import TagInput from '../components/TagInput';

const dummyDocs = [
  { name: 'Project Plan', type: 'pdf', date: 'Nov 10, 2023', tags: ['planning','project'], shared: true, sharedWith: ['A','B','C','D'], category:'Work' },
  { name: 'Design Mockup', type: 'jpg', date: 'Nov 5, 2023', tags: ['design','ui'], shared: false, sharedWith: [], category:'Work' },
  { name: 'Meeting Notes', type: 'doc', date: 'Nov 12, 2023', tags: ['meeting'], shared: true, sharedWith: ['E'], category:'Personal' },
  { name: 'Budget.xlsx', type: 'xls', date: 'Nov 8, 2023', tags: ['finance'], shared: false, sharedWith: [], category:'Work' },
];

function DocumentsPage() {
  const { setPreviewFile, setShareOpen, showToast } = useContext(AppContext);
  const [docs, setDocs] = useState(dummyDocs);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid / list
  const [selectedDocs, setSelectedDocs] = useState([]);

  const filteredDocs = docs.filter(doc => {
    const matchesQuery = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = searchCategory ? doc.category === searchCategory : true;
    return matchesQuery && matchesCategory;
  });

  const toggleSelect = (name) => {
    if(selectedDocs.includes(name)){
      setSelectedDocs(selectedDocs.filter(n => n !== name));
    } else {
      setSelectedDocs([...selectedDocs,name]);
    }
  };

  const selectAll = (e) => {
    if(e.target.checked){
      setSelectedDocs(filteredDocs.map(d=>d.name));
    } else {
      setSelectedDocs([]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Documents</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input 
          type="text"
          placeholder="Search documents..."
          className="border rounded px-3 py-2 flex-1"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select 
          className="border rounded px-3 py-2"
          value={searchCategory}
          onChange={e=>setSearchCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <div className="flex gap-2">
          <button className={`px-3 py-2 rounded ${viewMode==='grid'?'bg-blue-100 text-blue-700':'bg-gray-100 text-gray-700'}`} onClick={()=>setViewMode('grid')}>Grid</button>
          <button className={`px-3 py-2 rounded ${viewMode==='list'?'bg-blue-100 text-blue-700':'bg-gray-100 text-gray-700'}`} onClick={()=>setViewMode('list')}>List</button>
        </div>
      </div>

      {/* Bulk Action */}
      <div className="flex items-center gap-2">
        <input type="checkbox" onChange={selectAll} checked={selectedDocs.length===filteredDocs.length && filteredDocs.length>0}/>
        <button 
          className={`px-4 py-2 rounded bg-green-100 text-green-700 ${selectedDocs.length===0?'opacity-50 cursor-not-allowed':''}`}
          disabled={selectedDocs.length===0}
          onClick={()=>showToast(`Bulk action applied to ${selectedDocs.length} documents`)}
        >
          Bulk Actions ({selectedDocs.length})
        </button>
      </div>

      {/* Document Cards */}
      <div className={viewMode==='grid'?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4':'space-y-4'}>
        {filteredDocs.length===0 && <div className="text-center py-10 text-gray-500">No documents found</div>}
        {filteredDocs.map(doc=>(
          <div key={doc.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <input type="checkbox" checked={selectedDocs.includes(doc.name)} onChange={()=>toggleSelect(doc.name)}/>
              <i className={`fas fa-${doc.type==='pdf'?'file-pdf':doc.type==='doc'?'file-word':doc.type==='jpg'?'file-image':'file'} text-2xl`}></i>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.date}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {doc.tags.map(tag=><span key={tag} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{tag}</span>)}
                </div>
                {doc.shared && doc.sharedWith.length>0 && (
                  <div className="flex -space-x-2 mt-2">
                    {doc.sharedWith.slice(0,3).map(u=><div key={u} className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">{u}</div>)}
                    {doc.sharedWith.length>3 && <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-bold border-2 border-white">+{doc.sharedWith.length-3}</div>}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200" onClick={()=>setPreviewFile(doc)}>
                <i className="fas fa-eye"></i>
              </button>
              <button className="p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200" onClick={()=>setShareOpen(true)}>
                <i className="fas fa-share-alt"></i>
              </button>
              <button className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200">
                <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* File Upload & Tags */}
      <div className="mt-6 bg-white p-4 rounded shadow space-y-4">
        <h3 className="font-medium">Upload New Documents</h3>
        <FileUpload />
        <TagInput />
      </div>
    </div>
  );
}

export default DocumentsPage;
