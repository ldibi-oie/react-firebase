import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import WysiwygEditor from './components/editor/wysiwyg';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Navbar/>
    <App />
  </BrowserRouter>
);


