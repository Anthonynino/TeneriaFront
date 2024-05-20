import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRouter () {
    const {loading, isAuthenticated} = useAuth()
    
    if(! loading && !isAuthenticated){
      return <Navigate to='/login' replace/>
    }

    return(
       <Outlet/> //Esto quiere decir que retornara el componente solicitado, solamente si esta autenticado
    ) 
   }
   
   export default ProtectedRouter