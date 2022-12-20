import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './guards/AuthProvider';
import reactHookGuard from 'react-hook-guard';
import Spin from './components/Spin';
import AccessDenied from './components/AccessDenied';
import NotFound from './components/NotFound';
import {createRoot} from "react-dom/client";

reactHookGuard.config({
    SuspenseFallback: Spin,
    CantActivateFallback: AccessDenied,
    matchAllRoute: {
        path: '',
        component: NotFound,
    }
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <AuthProvider>
              <App />
          </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
