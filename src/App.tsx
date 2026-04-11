import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExamplePage from './pages/example/ExamplePage';
import FlexValuePage from './pages/flex-value/flex-value-list';
import FlexValueSetPage from './pages/flex-value/flex-value-set-list';
import FlexValueSetEditPage from './pages/flex-value/flex-value-set-edit';
import FlexValueSetDetailPage from './pages/flex-value/flex-value-set-detail';
import AppRouter from './AppRouter';


function App() {

  return <AppRouter />;

  return (
 
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<div>Home</div>} /> */}

        <Route path="/" element={<FlexValueSetPage />} /> 
        <Route path="/flex-value-set" element={<FlexValueSetPage />} />
        <Route path="/flex-value-set/edit" element={<FlexValueSetEditPage />} />
        <Route path="/flex-value-set/add" element={<FlexValueSetEditPage />} />
        <Route path="/flex-value-set/detail" element={<FlexValueSetDetailPage />} />

      </Routes>
    </BrowserRouter>
  );
 
}

export default App;
