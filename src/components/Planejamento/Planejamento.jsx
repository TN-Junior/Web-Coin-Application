import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Table from './Table'
import './Planejamento.css'

const Planejamento = () => {
  return (
    <>
      <div className='ContainerEmpresa'>
        <Sidebar />
        <div>
          <Header />
          <Table />
        </div>
      </div>
    </>
  )
}

export default Planejamento;
