import React from 'react';
import './Table.css';

function Table() {
  return (
    <div className="empresa-page">
      <div className="empresa-header">
        <h2>Empresas</h2>
        <button>+</button>
      </div>
      <div className="table-container">
        <table className="empresa-table">
          <thead>
            <tr className='Title'>
              <th>CNPJ</th>
              <th>Empresa</th>
              <th>Situação Cadastral</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>34.604.380/0001-95</td>
              <td>Procter & Gamble Company</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Exxon Mobil Corporation</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Berkshire Hathaway Inc.</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Coca-Cola Company</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Toyota Motor Corporation</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Microsoft Corporation</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Amazon.com, Inc.</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Tesla, Inc.</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Facebook, Inc.</td>
              <td>Ativa</td>
            </tr>
            <tr>
              <td>67.478.090/0001-00</td>
              <td>Nakia Ribeiro do Nas...</td>
              <td>Ativa</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
