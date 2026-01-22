import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ErrorBoundary from "./components/ErrorBoundary"; 
import './CSS/index.css'; // Your global styles
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);