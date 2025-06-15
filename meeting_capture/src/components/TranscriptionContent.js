import React from 'react';
import './ContentPanels.css'; // Common styling for content panels

function TranscriptionContent({ transcription }) {
  return (
    <div className="content-panel-text">
      <p>{transcription}</p>
    </div>
  );
}

export default TranscriptionContent;