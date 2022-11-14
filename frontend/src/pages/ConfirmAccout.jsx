import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmAccout = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {

      try {
        const url = `http://localhost:4000/api/usuarios/confirm-account/${id}`
        const { data } = await axios.get(url);
        
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

    }

    confirmAccount();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-center text-4xl">
        Confirm your account
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg p-5 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
      </div>
      {cuentaConfirmada && (
          <Link
          to="/"
          className="bg-sky-700 w-full text-white rounded-lg hover:cursos-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg block mt-10 px-3 py-3 text-center"
        >
          Sing in
        </Link>
        )}
    </>
  );
}

export default ConfirmAccout