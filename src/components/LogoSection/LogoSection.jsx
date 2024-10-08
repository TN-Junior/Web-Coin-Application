import React from 'react';
import logo from '../IMGs/LogoPA.jpg'; // Certifique-se de que a imagem esteja nesse caminho

const LogoSection = () => {
  return (
    <section className="logo-section">
      <img src={logo} alt="Logo Plataforma Ativa" className="logo-image" />
    </section>
  );
};

export default LogoSection;
