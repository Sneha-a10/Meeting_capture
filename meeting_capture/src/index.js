// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
// import ReactDOM from 'react-dom'; // For React 17 or older
import './index.css'; // If you have an index.css, otherwise remove or adapt
import App from './App';
import reportWebVitals from './reportWebVitals'; // If you're using reportWebVitals, otherwise remove

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // If you're using reportWebVitals, otherwise remove