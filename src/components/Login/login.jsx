import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const navigate = useNavigate();

  // Animação de queda
  const springProps = useSpring({
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
    config: { tension: 170, friction: 20 },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Inicia o loading

    try {
      const response = await axios.post("https://auth-coin.onrender.com/auth/login", {
        email,
        password,
      });

      // Sucesso: redireciona para a URL fornecida pelo backend
      console.log("Login bem-sucedido:", response.data);

      // Armazena o token e redireciona
      localStorage.setItem("token", response.data.token);
      navigate(response.data.redirect_url);
    } catch (error) {
      // Erros de login
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao se conectar com o servidor. Tente novamente mais tarde.");
      }
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false); // Para o loading
    }
  };

  return (
    <div className="login-container">
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
      <h1 className="coin-title">Coin</h1>
      <animated.div style={springProps} className="login-content">
        <div className="login-box">
          <form className="formm" onSubmit={handleLogin}>
            <div>
              <input
                className="emailinput"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="spinner"></div> // Spinner de loading
              ) : (
                "Entrar"
              )}
            </button>
            <div className="forgot-password">
              <a href="/forgot-password" className="forgot-password-link">
                Esqueci a senha
              </a>
              <a className="signup-link" href="/signup">Cadastre-se agora</a>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  );
}

export default Login;
