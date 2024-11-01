import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Table from './Table'
import './Planejamento.css'

const Planejamento = () => {
  return (
    <>
      <div className='ContainerEmpresa'>
      <Header />
        
        <div className='segundoContainer'>
        <Sidebar />
          <Table />
        </div>
      </div>
    </>
  )
}

export default Planejamento;
