import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/main-layout";

import FlexValueSetPage from "./pages/flex-value/flex-value-set-list";
import FlexValueSetEditPage from "./pages/flex-value/flex-value-set-edit";
import FlexValueSetDetailPage from "./pages/flex-value/flex-value-set-detail";
import LoginPage from "./pages/LoginPage";

// 👉 thêm check expire luôn (nếu bạn đã có)
// import { isTokenExpired } from "./services/auth";


// 🛡️ Private Route
const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("access_token");

  // if (!token || isTokenExpired()) {
  if (!token) {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔒 PROTECTED */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* default */}
          <Route index element={<FlexValueSetPage />} />

          <Route path="dashboard" element={<FlexValueSetPage />} />
          <Route path="flex-value-set" element={<FlexValueSetPage />} />
          <Route path="flex-value-set/edit" element={<FlexValueSetEditPage />} />
          <Route path="flex-value-set/add" element={<FlexValueSetEditPage />} />
          <Route path="flex-value-set/detail" element={<FlexValueSetDetailPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}