import React, { useState, useEffect } from 'react';
import './Header.css'; // Estilo separado para o header
import { FaSearch } from 'react-icons/fa'; // Importando o ícone de lupa

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Função para tratar o clique na lupa ou enter no campo de busca
    const handleSearch = () => {
        if (searchTerm.trim()) {
            searchInTables(searchTerm);
            searchInPageContent(searchTerm);
        } else {
            console.log('Campo de pesquisa vazio');
        }
    };

    // Função para lidar com a tecla "Enter"
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Função para pesquisar nas tabelas
    const searchInTables = (term) => {
        const tables = document.querySelectorAll('table');
        tables.forEach((table) => {
            const rows = table.querySelectorAll('tr');
            rows.forEach((row) => {
                const cells = row.querySelectorAll('td');
                let rowContainsTerm = false;
                cells.forEach((cell) => {
                    if (cell.textContent.toLowerCase().includes(term.toLowerCase())) {
                        rowContainsTerm = true;
                    }
                });
                if (rowContainsTerm) {
                    row.style.display = ''; // Mostra a linha se corresponder ao termo
                } else {
                    row.style.display = 'none'; // Oculta a linha se não corresponder
                }
            });
        });
    };

    // Função para pesquisar no conteúdo da página fora das tabelas
    const searchInPageContent = (term) => {
        const elements = document.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6'); // Elementos comuns de conteúdo
        elements.forEach((element) => {
            if (element.textContent.toLowerCase().includes(term.toLowerCase())) {
                element.style.backgroundColor = '#43a3de'; // Destaque os elementos encontrados
            } else {
                element.style.backgroundColor = ''; // Remove o destaque dos outros
            }
        });
    };

    useEffect(() => {
        // Limpa o destaque quando o termo de busca é removido
        if (!searchTerm) {
            const elements = document.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');
            elements.forEach((element) => {
                element.style.backgroundColor = ''; // Remove o destaque
            });
            // Mostra todas as linhas da tabela novamente
            const rows = document.querySelectorAll('table tr');
            rows.forEach((row) => row.style.display = '');
        }
    }, [searchTerm]);

    return (
        <div className="header">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Pesquisar..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyDown={handleKeyDown} // Dispara busca ao pressionar "Enter"
                />
                <button onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
            <button>Fernanda F.</button>
        </div>
    );
};

export default Header;
