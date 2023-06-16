import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { InsuranceProvider } from "./context/InsurancePolicy";
//import { BidderProvider } from "./context/BidderContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
  <InsuranceProvider>
    <App />
  </InsuranceProvider>
  </BrowserRouter>
);

