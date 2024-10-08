import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from 'axios';
import "./signup.css";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Animação de queda
  const springProps = useSpring({
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
    config: { tension: 170, friction: 20 }, // Configurações de animação para suavidade
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name,
        email,
        password
      });

      // Se o cadastro for bem-sucedido, você pode redirecionar o usuário para a página de login
      console.log('Cadastro bem-sucedido:', response.data);
    } catch (error) {
      // Tratar erros de cadastro
      console.error('Erro ao cadastrar:', error);
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="signup-container">
      <animated.div style={springProps} className="signup-content">
        <div className="coin-title">COIN</div>
        <div className="signup-box">
          <form onSubmit={handleSignup}>
            <div>
              <input type="text" placeholder="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <input type="password" placeholder="Confirme a Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Cadastrar</button>
          </form>
        </div>
        <div className="login-link">
          Já tem uma conta? <a href="/">Faça login</a>
        </div>
      </animated.div>
    </div>
  );
}

export default Signup;
