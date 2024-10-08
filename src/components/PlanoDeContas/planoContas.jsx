import React, { useState } from 'react';
import "../PlanoDeContas/planoContas.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from '../Header/Header';

const AccountPlan = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedStatuses, setSelectedStatuses] = useState(['Agendada', 'Paga', 'Vencida']);

    const accounts = [
        { conta: 'Telefone', status: 'Agendada', categoria: 'Receita', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Luz', status: 'Paga', categoria: 'Despesa', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Agua', status: 'Vencida', categoria: 'Receita', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Internet', status: 'Agendada', categoria: 'Receita', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Gás', status: 'Agendada', categoria: 'Receita', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Transporte', status: 'Agendada', categoria: 'Despesa', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Aluguel', status: 'Agendada', categoria: 'Despesa', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Terceirizados', status: 'Agendada', categoria: 'Despesa', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Segurança', status: 'Agendada', categoria: 'Despesa', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
        { conta: 'Rastreador', status: 'Agendada', categoria: 'Despesa', valor: 'R$ 1234,50', vencimento: '10-09-2014' },
    ];

    // Filtra as contas por categoria e status
    const filteredAccounts = accounts.filter(account => 
        (selectedCategory === 'Todos' || account.categoria === selectedCategory) &&
        (selectedStatuses.includes(account.status))
    );

    // Atualiza o status selecionado ao marcar/desmarcar o checkbox
    const handleStatusChange = (status) => {
        if (selectedStatuses.includes(status)) {
            setSelectedStatuses(selectedStatuses.filter(s => s !== status));
        } else {
            setSelectedStatuses([...selectedStatuses, status]);
        }
    };

    return (
        <>
            <div className='ContainerGeral'>
                <Sidebar />

                <div className='ContainerPlanos'>
                    
                    <section className='plan-section'>
                        <div className="text-button">
                            <h2>Plano de Contas</h2>
                            <button>+</button>
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

                        {/* Menu para selecionar Status */}
                        <div className="menu-status">
                            <h4>Status</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedStatuses.includes('Agendada')}
                                    onChange={() => handleStatusChange('Agendada')}
                                />
                                Agendada
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedStatuses.includes('Paga')}
                                    onChange={() => handleStatusChange('Paga')}
                                />
                                Paga
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedStatuses.includes('Vencida')}
                                    onChange={() => handleStatusChange('Vencida')}
                                />
                                Vencida
                            </label>
                        </div>

                        <div className='table-content'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Conta</th>
                                        <th>Status</th>
                                        <th>Categoria</th>
                                        <th>Valor</th>
                                        <th>Vencimento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAccounts.map((account, index) => (
                                        <tr key={index}>
                                            <td>{account.conta}</td>
                                            <td className={`status ${account.status.toLowerCase()}`}>{account.status}</td>
                                            <td>{account.categoria}</td>
                                            <td>{account.valor}</td>
                                            <td>{account.vencimento}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default AccountPlan;
