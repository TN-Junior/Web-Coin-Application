import React from 'react';
import './Header.css'; // Estilo separado para o header
import { FaSearch } from 'react-icons/fa'; // Importando o ícone de lupa

const Header = () => {
    return (
        <div className="header">
            <div className="search-bar">
                <input type="text" placeholder="Pesquisar..." />
            </div>
            <button>Fernanda F.</button>
        </div>
    );
};

export default Header;
