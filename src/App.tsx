import { Outlet } from 'react-router-dom'
import Header from './components/layout/header'
import './styles/global.css'


function App() {


  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
