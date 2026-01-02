import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // 	Your API key: 52609803-933344cf37d0c6144f6fe0bf2
// const API_KEY = '52609803-933344cf37d0c6144f6fe0bf2';
// const BASE_URL = 'https://pixabay.com/api/';
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12