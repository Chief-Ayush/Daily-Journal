import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChapterContextProvider} from './context/ChapterContext'
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ChapterContextProvider>
    <App />
    </ChapterContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

