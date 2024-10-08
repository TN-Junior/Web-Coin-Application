import React, { useState } from 'react';
import CadastroUsuario from './CadastroUsuario';
import CadastroEmpresa from './CadastroEmpresa';

const Cadastro = () => {
  const [tipoCadastro, setTipoCadastro] = useState('usuario');

  const handleTipoChange = (tipo) => {
    setTipoCadastro(tipo);
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => handleTipoChange('usuario')}
          style={{
            marginRight: '10px',
            backgroundColor: tipoCadastro === 'usuario' ? '#e0bf6c' : '#ccc',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Usuário
        </button>
        <button
          onClick={() => handleTipoChange('empresa')}
          style={{
            backgroundColor: tipoCadastro === 'empresa' ? '#e0bf6c' : '#ccc',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Empresa
        </button>
      </div>
      {tipoCadastro === 'usuario' ? <CadastroUsuario /> : <CadastroEmpresa />}
    </div>
  );
};

export default Cadastro;
