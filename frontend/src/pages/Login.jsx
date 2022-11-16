import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import axiosClient from "../config/AxiosClient";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlerta({
        msg: 'All the fields are required',
        error: true
      })
      return;
    }

    try {
      const { data } = await axiosClient.post("/usuarios/login", {email, password});
      setAlerta({});
      localStorage.setItem('token', data.token)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-4xl">
        Manage your <span className="text-slate-700"> projects</span>
      </h1>

      <form
        className="my-10 bg-white rounded-md shadow-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="text-gray-600 block text-xl font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label
            className="text-gray-600 block text-xl font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {msg && <Alerta alerta={alerta} />}

        <input
          type="submit"
          value="SIGN IN"
          className="bg-sky-700 w-full my-5 py-3 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/signup"
          className="block my-5 px-3 font-semibold text-center text-slate-500 text-sm uppercase"
        >
          Sing up
        </Link>
        <Link
          to="/reset-password"
          className="block my-5 px-3 font-semibold text-center text-slate-500 text-sm uppercase"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
}

export default Login