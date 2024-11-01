import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Modal from 'react-modal';
import './Pagamento.css';
import { MdEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";




// Configuração do Modal
Modal.setAppElement('#root');

const Pagamentos = () => {
  const [isReceitas, setIsReceitas] = useState(true);
  const [pagamentos, setPagamentos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pagamentoAtual, setPagamentoAtual] = useState(null); // Estado para o pagamento a ser editado
  const [novoPagamento, setNovoPagamento] = useState({
    descricao: '',
    valor: '',
    data: '',
  });

  useEffect(() => {
    loadPagamentos(isReceitas);
  }, [isReceitas]);

  const toggleReceitasDespesas = () => {
    setIsReceitas(!isReceitas);
  };

  const loadPagamentos = async (isReceitas) => {
    try {
      const tipo = isReceitas ? 'RECEITA' : 'DESPESA';
      const response = await axios.get(`https://coin-backend-qrd3.onrender.com/api/pagamentos/${tipo}`);
      setPagamentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
    }
  };

  const openModal = (pagamento = null) => {
    if (pagamento) {
      setPagamentoAtual(pagamento);
      setNovoPagamento({
        descricao: pagamento.descricao,
        valor: pagamento.valor,
        data: pagamento.data.split('T')[0], // Certificando-se de que a data esteja no formato correto
      });
    } else {
      setPagamentoAtual(null); // Para adição de um novo pagamento
      setNovoPagamento({
        descricao: '',
        valor: '',
        data: '',
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setPagamentoAtual(null); // Limpa o pagamento atual ao fechar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoPagamento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tipo = isReceitas ? 'RECEITA' : 'DESPESA';
      const pagamento = {
        ...novoPagamento,
        tipo,
      };
      if (pagamentoAtual) {
        // Se estiver editando, faz uma requisição PUT
        await axios.put(`https://coin-backend-qrd3.onrender.com/api/pagamentos/${pagamentoAtual.id}`, pagamento);
      } else {
        // Caso contrário, é uma adição de novo pagamento
        await axios.post('https://coin-backend-qrd3.onrender.com/api/pagamentos', pagamento);
      }
      loadPagamentos(isReceitas);
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar pagamento:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://coin-backend-qrd3.onrender.com/api/pagamentos/${id}`);
      loadPagamentos(isReceitas);
    } catch (error) {
      console.error('Erro ao excluir pagamento:', error);
    }
  };

  return (
    <>
      <div className='ContainerEmpresa'>
        <Header />
        <div className='segundoContainer'>
          <Sidebar />

          <div className='content'>
            <div className='toggle-add-container'>
              <div className='toggle-container'>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={isReceitas} 
                    onChange={toggleReceitasDespesas} 
                  />
                  <span className="slider"></span>
                </label>
                <span>{isReceitas ? 'Receitas' : 'Despesas'}</span>
              </div>
              <button className='add-button' onClick={() => openModal()}>
                Adicionar Pagamento
              </button>
            </div>

            <div className='table-container'>
              {isReceitas ? (
                <TabelaReceitas pagamentos={pagamentos} openModal={openModal} handleDelete={handleDelete} />
              ) : (
                <TabelaDespesas pagamentos={pagamentos} openModal={openModal} handleDelete={handleDelete} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para adicionar ou editar pagamento */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Pagamento"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{pagamentoAtual ? 'Editar Pagamento' : 'Adicionar Pagamento'}</h2>
        <form onSubmit={handleSubmit} className='form-pagamento'>
          <div className='form-group1'>
            <label htmlFor='descricao'>Descrição:</label>
            <input
              type='text'
              id='descricao'
              name='descricao'
              className='inputDescricao'
              value={novoPagamento.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='valor'>Valor:</label>
            <input
              type='number'
              id='valor'
              name='valor'
              value={novoPagamento.valor}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>
          <div className='form-group'>
            <label htmlFor='data'>Data:</label>
            <input
              type='date'
              id='data'
              name='data'
              value={novoPagamento.data}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-actions'>
            <button type='submit' className='submit-button'>{pagamentoAtual ? 'Salvar' : 'Adicionar'}</button>
            <button type='button' onClick={closeModal} className='cancel-button'>Cancelar</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const TabelaReceitas = ({ pagamentos, openModal, handleDelete }) => {
  return (
    <table className='styled-table'>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pagamentos.map((pagamento) => (
          <tr key={pagamento.id}>
            <td>{pagamento.descricao}</td>
            <td>R$ {pagamento.valor.toFixed(2)}</td>
            <td>{new Date(pagamento.data).toLocaleDateString('pt-BR')}</td>
            <td>
              <button className='editButton' onClick={() => openModal(pagamento)}><MdEditNote /></button>
              <button className='deleteButton' onClick={() => handleDelete(pagamento.id)}><MdDeleteForever />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TabelaDespesas = ({ pagamentos, openModal, handleDelete }) => {
  return (
    <table className='styled-table'>
      <thead>
        <tr className='trpai'>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Data</th>
          <th className='th4'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pagamentos.map((pagamento) => (
          <tr key={pagamento.id}>
            <td>{pagamento.descricao}</td>
            <td>R$ {pagamento.valor.toFixed(2)}</td>
            <td>{new Date(pagamento.data).toLocaleDateString('pt-BR')}</td>
            <td>
              <button className='editButton' onClick={() => openModal(pagamento)}><MdEditNote />
              </button>
              <button className='deleteButton' onClick={() => handleDelete(pagamento.id)}><MdDeleteForever />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Pagamentos;
