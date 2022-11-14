import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../config/AxiosClient";
import Alerta from "../components/Alerta";

const NewPassword = () => {
const [validToken, setValidToken] = useState(false);
const [alerta, setAlerta] = useState({})
const [password, setPassword] = useState('');
const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const getToken = async () => {
      try {
        await axiosClient.get(`/usuarios/reset-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    getToken();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      setAlerta({
        msg: 'The password must have at least 6 characters',
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/reset-password/${token}`;
      const { data } = await axiosClient.post(url, {password});
      setAlerta({
        msg: data.msg,
        error: false
      });
      setPasswordModified(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-center text-4xl mb-10">
       Reset your password
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      {validToken && (
        <form 
          className="bg-white rounded-md shadow-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="text-gray-600 block text-xl font-semibold"
              htmlFor="password"
            >
              New password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your new  password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Confirm password"
            className="bg-sky-700 w-full  mb-5 py-3 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg"
          />
      </form>
      )}
      {passwordModified && (
        <Link
          to="/"
          className="block my-5 px-3 text-center font-semibold text-slate-500 text-sm uppercase"
        >
          Sing in
        </Link>
        )}
    </>
  );
}

export default NewPassword