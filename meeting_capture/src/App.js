import React, { useState } from 'react';
import Uploader from './components/Uploader';
import Tabs from './components/Tabs';
import TranscriptionContent from './components/TranscriptionContent';
import SummaryContent from './components/SummaryContent';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('transcription');
  const [uploadedFile, setUploadedFile] = useState(null);

  const mockTranscription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  const mockSummary = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `;

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    console.log("File uploaded:", file.name);
  };

  return (
    <div className="app-container">
      <Uploader uploadedFile={uploadedFile} onFileUpload={handleFileUpload} />
      {uploadedFile && (
        <div className="content-panel">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="tab-content">
            {activeTab === 'transcription' && (
              <TranscriptionContent transcription={mockTranscription} />
            )}
            {activeTab === 'summary' && (
              <SummaryContent summary={mockSummary} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;