import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { InsuranceProvider } from "./context/InsurancePolicy";
import { VehicleProvider } from "./context/Vehicle";
import { ClaimProvider } from "./context/Claim";

const root = ReactDOM.createRoot(document.getElementById('root'));
// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <InsuranceProvider>
      <VehicleProvider>
        <ClaimProvider>
          <App />
        </ClaimProvider>
      </VehicleProvider>
    </InsuranceProvider>
  </BrowserRouter>
);

