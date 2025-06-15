import React from 'react';
import './Tabs.css';
import copyIcon from '../assets/copy.png';
import downloadIcon from '../assets/downloads.png';

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-container">
      <div className="tabs-left">
        <div
          className={`tab-item ${activeTab === 'transcription' ? 'active' : ''}`}
          onClick={() => setActiveTab('transcription')}
        >
          Transcription
        </div>
        <div
          className={`tab-item ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </div>
      </div>
      <div className="tabs-right">
        <img src={copyIcon} alt="Copy" className="tab-icon" />
        <img src={downloadIcon} alt="Download" className="tab-icon" />
      </div>
    </div>
  );
}

export default Tabs;