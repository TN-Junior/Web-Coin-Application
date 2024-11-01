import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./signup.css";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Animação de queda
  const springProps = useSpring({
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
    config: { tension: 170, friction: 20 },
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://auth-coin.onrender.com/auth/register', {
        name,
        email,
        password
      });

      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Erro ao criar conta. Tente novamente.');
      } else {
        setError('Erro de conexão com o servidor.');
      }
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
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

      <animated.div style={springProps} className="signup-content">
        <div className="coin-title">Coin</div>
        <div className="signup-box">
          {/* Seta de Voltar */}
          <div className="back-arrow" onClick={() => navigate('/')}>
            &#8592; {/* Seta para esquerda */}
          </div>

          <form className="signupform" onSubmit={handleSignup}>
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
            {success && <div className="success-message">{success}</div>}

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  "Cadastrar"
                )}
              </button>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  );
}

export default Signup;
