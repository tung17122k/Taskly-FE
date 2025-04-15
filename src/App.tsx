import { Outlet } from 'react-router-dom'
import Header from './components/layout/header'
import './styles/global.css'
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/auth.context';
import axios from "./utils/axios.customize"

function App() {
  const { setAuth, isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setIsLoading(true)
      const res = await axios.get('/v1/api/account');
      console.log(">>>res", res);

      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.data.email,
            username: res.data.username,
            role: res.data.role,
          },
        })
      }
      setIsLoading(false)
    }
    fetchAccount();
  }, [])

  return (
    <>
      {isLoading ? <>Loading...</> : <><Header />
        <Outlet /></>}

    </>
  )
}

export default App
