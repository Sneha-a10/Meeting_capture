import React from 'react';
import downloadIcon from '../assets/downloads.png'; // Correct file name and extension
import './MediaPlayer.css';

function MediaPlayer({ fileName, fileUrl }) {
  const handleFileClick = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank'); // Open the file in a new tab
    } else {
      console.error("File URL is not available");
    }
  };

  return (
    <div className="media-player">
      <img
        src={downloadIcon}
        alt="File Icon"
        className="file-icon"
        onClick={handleFileClick} // Make the icon clickable
        style={{ cursor: 'pointer' }}
      />
      <div className="file-name">{fileName}</div>
    </div>
  );
}

export default MediaPlayer;