import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../PlanoDeContas/planoContas.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from '../Header/Header';

const AccountPlan = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [accounts, setAccounts] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [form, setForm] = useState({
        conta: '',
        status: '',
        categoria: '',
        valor: '',
        vencimento: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Função para buscar contas do backend
    const fetchAccounts = async () => {
        try {
            setIsLoading(true); // Ativa o loader
            const response = await axios.get('https://coin-backend-qrd3.onrender.com/api/planocontas');
            console.log('Contas recebidas do backend:', response.data); // Verificação
            setAccounts(response.data); // Atualiza o estado com os dados recebidos
        } catch (error) {
            console.error('Erro ao buscar contas:', error);
        } finally {
            setIsLoading(false); // Desativa o loader
        }
    };

    // Chama a função para buscar as contas ao montar o componente
    useEffect(() => {
        fetchAccounts();
    }, []);

    // Filtra as contas por categoria
    const filteredAccounts = accounts.filter(account => 
        selectedCategory === 'Todos' || account.categoria === selectedCategory
    );

    // Abre o popup para adicionar uma nova conta
    const handleAddAccount = () => {
        setForm({ conta: '', status: '', categoria: '', valor: '', vencimento: '' });
        setIsEditMode(false);
        setIsPopupOpen(true);
    };

    // Abre o popup para editar uma conta existente
    const handleEditAccount = (account) => {
        setForm(account);
        setCurrentId(account.id);
        setIsEditMode(true);
        setIsPopupOpen(true);
    };

    // Exclui uma conta do backend e atualiza a lista
    const handleDeleteAccount = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/planocontas/${id}`);
            fetchAccounts(); // Atualiza a lista após deletar
        } catch (error) {
            console.error('Erro ao deletar conta:', error);
        }
    };

    // Salva ou atualiza uma conta no backend
    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await axios.put(`http://localhost:8080/api/planocontas/${currentId}`, form);
            } else {
                await axios.post('http://localhost:8080/api/planocontas', form);
            }
            fetchAccounts(); // Atualiza a lista após salvar
            setIsPopupOpen(false); // Fecha o popup
        } catch (error) {
            console.error('Erro ao salvar conta:', error);
        }
    };

    // Atualiza o valor do formulário ao mudar os campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Exibe uma mensagem de carregamento enquanto os dados são buscados
    if (isLoading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className='ContainerGeral'>
            <Sidebar />
            <Header />
            <div className='ContainerPlanos'>
                <section className='plan-section'>
                    <div className="text-button">
                        <h2>Plano de Contas</h2>
                        <button onClick={handleAddAccount}>+</button>
                    </div>

                    {/* Menu para alternar entre Receitas e Despesas */}
                    <div className="menu">
                        <button
                            className={selectedCategory === 'Receita' ? 'active' : ''}
                            onClick={() => setSelectedCategory('Receita')}
                        >
                            Receitas
                        </button>
                        <button
                            className={selectedCategory === 'Despesa' ? 'active' : ''}
                            onClick={() => setSelectedCategory('Despesa')}
                        >
                            Despesas
                        </button>
                        <button
                            className={selectedCategory === 'Todos' ? 'active' : ''}
                            onClick={() => setSelectedCategory('Todos')}
                        >
                            Todos
                        </button>
                    </div>

                    <div className='table-content'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Status</th>
                                    <th>Categoria</th>
                                    <th>Valor</th>
                                    <th>Vencimento</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAccounts.length > 0 ? (
                                    filteredAccounts.map((account) => (
                                        <tr key={account.id}>
                                            <td>{account.conta}</td>
                                            <td className={`status ${account.status.toLowerCase()}`}>{account.status}</td>
                                            <td>{account.categoria}</td>
                                            <td>{account.valor}</td>
                                            <td>{account.vencimento}</td>
                                            <td>
                                                <button onClick={() => handleEditAccount(account)}>Editar</button>
                                                <button onClick={() => handleDeleteAccount(account.id)}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Nenhuma conta encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* Popup para adicionar/editar conta */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>{isEditMode ? 'Editar Conta' : 'Adicionar Conta'}</h3>
                        <input name="conta" value={form.conta} onChange={handleChange} placeholder="Conta" />
                        <input name="status" value={form.status} onChange={handleChange} placeholder="Status" />
                        <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" />
                        <input name="valor" value={form.valor} onChange={handleChange} placeholder="Valor" />
                        <input name="vencimento" value={form.vencimento} onChange={handleChange} placeholder="Vencimento" />
                        <div className="popup-actions">
                            <button onClick={handleSubmit}>{isEditMode ? 'Atualizar' : 'Salvar'}</button>
                            <button onClick={() => setIsPopupOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPlan;
