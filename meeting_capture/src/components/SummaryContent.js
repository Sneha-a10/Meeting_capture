import React from 'react';
import './ContentPanels.css'; // Common styling for content panels

function SummaryContent({ summary }) {
  return (
    <div className="content-panel-text">
      <p>{summary}</p>
    </div>
  );
}

export default SummaryContent;