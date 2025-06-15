import React, { useRef } from 'react';
import './Uploader.css';
import fileIcon from '../assets/audio.png'; // Correct file name

function Uploader({ uploadedFile, onFileUpload }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="uploader-container">
      {uploadedFile ? (
        <div className="uploaded-file">
          <img src={fileIcon} alt="File Icon" className="file-icon" />
          <span className="file-name">{uploadedFile.name}</span>
        </div>
      ) : (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="upload-box" onClick={handleUploadClick}>
            <p>Upload</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Uploader;