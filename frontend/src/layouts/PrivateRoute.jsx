import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PrivateRoute = () => {
    const { auth, cargando } = useAuth();

    if(cargando) return 'Cargando...'
    return (
    <>
        {auth._id ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export default PrivateRoute