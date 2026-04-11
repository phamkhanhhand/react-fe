import { BrowserRouter, Routes, Route } from "react-router-dom"; 
// import Dashboard from "../pages/Dashboard"; 
import MainLayout from "./layouts/main-layout";
import FlexValueSetPage from "./pages/flex-value/flex-value-set-list";
import FlexValueSetEditPage from "./pages/flex-value/flex-value-set-edit";
import FlexValueSetDetailPage from "./pages/flex-value/flex-value-set-detail";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<FlexValueSetPage />} />
          <Route path="flex-value-set" element={<FlexValueSetPage />} /> 
          <Route path="/" element={<FlexValueSetPage />} /> 
          <Route path="/flex-value-set" element={<FlexValueSetPage />} />
          <Route path="/flex-value-set/edit" element={<FlexValueSetEditPage />} />
          <Route path="/flex-value-set/add" element={<FlexValueSetEditPage />} />
          <Route path="/flex-value-set/detail" element={<FlexValueSetDetailPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}