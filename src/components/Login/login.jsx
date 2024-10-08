import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import axios from 'axios';
import "./login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirecionamento

  // Animação de queda
  const springProps = useSpring({
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
    config: { tension: 170, friction: 20 }, // Configurações de animação para suavidade
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      // Se o login for bem-sucedido, redireciona para o /dashboard
      console.log('Login bem-sucedido:', response.data);

      // Armazena o token no localStorage (opcional, se precisar usar para autenticação)
      localStorage.setItem('token', response.data.token);

      // Redireciona para a URL fornecida pelo backend
      navigate(response.data.redirect_url); // Redireciona para o dashboard
    } catch (error) {
      // Tratar erros de login
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message); // Exibir mensagem específica do backend
      } else {
        setError('Erro ao se conectar com o servidor. Tente novamente mais tarde.');
      }
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-container">
      <animated.div style={springProps} className="login-content">
        <div className="coin-title">COIN</div>
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <div>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="forgot-password">
              <a href="/forgot-password" className="forgot-password-link">Esqueci a senha</a>
            </div>
            <button type="submit">Entrar</button>
          </form>
        </div>
        <div className="signup-link">
          Ainda não é colaborador? <a href="/signup">Cadastre-se agora</a>
        </div>
      </animated.div>
    </div>
  );
}

export default Login;
