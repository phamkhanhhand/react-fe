import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
      navigate("/");
    } catch (err: any) {
      setError("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <img src="/logo.png" alt="logo" className="login-logo" />

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Đăng nhập để tiếp tục</p>

        {error && <div className="login-error">{error}</div>}

        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* 👇 PASSWORD FIELD WITH TOGGLE */}
<div className="password-wrapper">
  <input
    className="login-input"
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleLogin();
    }}
  />

  <span
    className={`toggle-password ${showPassword ? "show" : ""}`}
    onClick={() => setShowPassword(!showPassword)}
  />
</div>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Login"}
        </button>

      </div>
    </div>
  );
}