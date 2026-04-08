import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExamplePage from './pages/example/ExamplePage';
import FlexValuePage from './pages/flex-value/flex-value-list';
import FlexValueSetPage from './pages/flex-value/flex-value-set-list';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<div>Home</div>} /> */}

        <Route path="/" element={<FlexValueSetPage />} />
        <Route path="/flex-values" element={<FlexValuePage />} />
        <Route path="/flex-value-sets" element={<FlexValueSetPage />} />

      </Routes>
    </BrowserRouter>
  );
 
}

export default App;
