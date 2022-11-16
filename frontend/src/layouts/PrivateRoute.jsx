import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PrivateRoute = () => {
    const { auth } = useAuth();


    return (
    <>
        {auth._id ? 
         'autenticado'
        : <Navigate to="/" />}
    </>
  )
}

export default PrivateRoute