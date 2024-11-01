import React, { useState } from 'react';

const CadastroEmpresa = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    email: '',
    confirmarEmail: '',
    senha: '',
    confirmarSenha: '',
    cnpj: '',
  });

  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErro(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== formData.confirmarEmail) {
      setErro('Os emails não coincidem.');
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    console.log('Form data submitted:', formData);

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome da Empresa:</label>
        <input
          type="text"
          name="nomeEmpresa"
          value={formData.nomeEmpresa}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Confirmar Email:</label>
        <input
          type="email"
          name="confirmarEmail"
          value={formData.confirmarEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Confirmar Senha:</label>
        <input
          type="password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>CNPJ:</label>
        <input
          type="text"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />
      </div>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <button type="submit">Cadastrar</button>
      <a href="/login" style={{ marginLeft: '10px' }}>Já possuo login</a>
    </form>
  );
};

export default CadastroEmpresa;

