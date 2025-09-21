export const searchResults = [
    { id: 1, name: 'Financial Statement Q3.pdf', category: 'Professional', tags: ['Finance', 'Statement'], date: '2023-10-15', type: 'pdf', shared: true, sharedWith: ['JD', 'JS'] },
    { id: 2, name: 'Team Building Event.jpg', category: 'Personal', tags: ['Event', 'Team'], date: '2023-09-22', type: 'img', shared: false, sharedWith: [] },
    { id: 3, name: 'Product Roadmap.pptx', category: 'Professional', tags: ['Product', 'Roadmap'], date: '2023-09-10', type: 'ppt', shared: true, sharedWith: ['JD', 'RJ'] },
    { id: 4, name: 'Budget Spreadsheet.xlsx', category: 'Professional', tags: ['Budget', 'Finance'], date: '2023-08-30', type: 'xls', shared: true, sharedWith: ['JD', 'JS', 'RJ'] },
    { id: 5, name: 'Meeting Notes.txt', category: 'Professional', tags: ['Meeting', 'Notes'], date: '2023-08-15', type: 'txt', shared: false, sharedWith: [] },
    { id: 6, name: 'Vacation Photos.zip', category: 'Personal', tags: ['Photos', 'Vacation'], date: '2023-07-22', type: 'zip', shared: true, sharedWith: ['JD'] }
  ];
  
  export const activityData = [
    { id: 1, user: 'John Doe', userInitials: 'JD', action: 'uploaded', document: 'Annual Report 2023.pdf', category: 'Professional', tags: ['Finance', 'Report'], time: '2 hours ago', color: 'blue' },
    { id: 2, user: 'Jane Smith', userInitials: 'JS', action: 'shared', document: 'Project Proposal.docx', sharedWith: ['Robert Johnson', 'Michael Brown'], time: '5 hours ago', color: 'purple' },
    { id: 3, user: 'Robert Johnson', userInitials: 'RJ', action: 'downloaded', document: 'Budget Spreadsheet.xlsx', from: 'John Doe', time: 'Yesterday', color: 'green' },
    { id: 4, user: 'Michael Brown', userInitials: 'MB', action: 'edited', document: 'Meeting Notes.txt', version: 'v1.2 → v1.3', time: '2 days ago', color: 'yellow' },
    { id: 5, user: 'Sarah Williams', userInitials: 'SW', action: 'deleted', document: 'Old Presentation.pptx', reason: 'Outdated content', time: '3 days ago', color: 'red' }
  ];
  
  export const usersData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', initials: 'JD', role: 'Admin', lastLogin: '2023-11-15 09:30', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', initials: 'JS', role: 'Editor', lastLogin: '2023-11-14 14:22', status: 'Active' },
    { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', initials: 'RJ', role: 'Viewer', lastLogin: '2023-11-10 11:45', status: 'Inactive' }
  ];