import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./forgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Verificar se as senhas coincidem
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      // Endpoint de redefinição de senha
      const response = await axios.post("https://auth-coin.onrender.com/auth/reset-password", {
        email,
        newPassword,
      });

      setSuccess("Senha redefinida com sucesso!");
      setTimeout(() => {
        navigate("/"); // Redirecionar para a tela de login após sucesso
      }, 2000);
    } catch (error) {
      setError("Erro ao redefinir a senha. Tente novamente.");
      console.error("Erro:", error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="forgot-password-box">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handlePasswordReset} className="forgot-password-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirme Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit">Redefinir Senha</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
