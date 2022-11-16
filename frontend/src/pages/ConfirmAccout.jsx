import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/AxiosClient";
import Alerta from "../components/Alerta";

const ConfirmAccout = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {

      try {
        const url = `/usuarios/confirm-account/${id}`
        const { data } = await axiosClient.get(url);
        
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

        {!cuentaConfirmada && (
          <>
            <h2 className="text-center text-red-500 font-semibold uppercase text-xl">Invalid Token</h2>
            <Link
            to="/signup"
            className="bg-sky-700 w-full text-white rounded-lg hover:cursos-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg block mt-10 px-3 py-3 text-center"
            >
              Sing up
            </Link>
          </>
        )}
        {cuentaConfirmada && (
          <Link
            to="/"
            className="bg-sky-700 w-full text-white rounded-lg hover:cursos-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg block mt-10 px-3 py-3 text-center"
          >
            Sing in
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmAccout