import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../config/AxiosClient";
import Alerta from "../components/Alerta";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === '' || !email.includes('@')) {
      setAlerta({
        msg: "Enter your email",
        error: true
      })
      return
    }

    try {
      const { data } = await axiosClient.post(`/usuarios/reset-password`, {email});
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-gray-700 font-black text-center text-4xl">
        Reset your password
      </h1>
      <form 
        className="my-10 bg-white rounded-md shadow-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <label
            className="text-gray-600 block text-md font-regular"
            htmlFor="email"
          >
            Enter your user account's verified email address and we will send
            you a password reset link.
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
        </div>

        {msg && <Alerta  alerta={alerta}/>}

        <input
          type="submit"
          value="Send password reset email"
          className="bg-sky-700 w-full my-5 py-3 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg"
        />
        
      </form>

      <nav>
        <Link
          to="/"
          className="block my-5 px-3 font-semibold text-center text-slate-500 text-sm uppercase"
        >
          Sign in
        </Link>
      </nav>
    </>
  );
}

export default ForgotPassword