import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Alerta from "../components/Alerta";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([name, email, password, repeatPassword].includes('')){
      setAlerta({
        msg: 'All the fields are required',
        error: true
      })
      return
    }

    if(password !== repeatPassword) {
      setAlerta({
        msg: 'Passwords do not match',
        error: true
      });
      return
    }

    if(password.length < 6 || repeatPassword.length < 6){
      setAlerta({
        msg: 'The password must have at least 6 characters',
        error: true
      });
      return
    }

    setAlerta({});

    //Crear usuario en la API
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, 
      {name, email, password});
      setAlerta({
        msg: data.msg,
        error: false
      })
      setName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  const { error } = alerta;
  const isEmpty = error;

  return (
    <>
      <h1 className="text-sky-600 font-black text-center text-4xl">
        Manage your <span className="text-slate-700"> projects</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white rounded-md shadow-lg p-10"
      >
        <div className="my-5">
          <label
            className="text-gray-600 block text-xl font-semibold"
            htmlFor="name"
          >
            Full name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className={`${
              isEmpty && name === "" ? "border-red-400" : "border"
            } w-full mt-3 p-3 border rounded-xl bg-gray-50`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* {isEmpty && nombre === "" && (
            <p className="text-red-400 mt-2">Please enter your name</p>
          )} */}
        </div>

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
            className={`${
              isEmpty && email === "" ? "border-red-400" : "border"
            } w-full mt-3 p-3 border rounded-xl bg-gray-50`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* {isEmpty && email === "" && (
            <p className="text-red-400 mt-2">Please enter your email</p>
          )} */}
        </div>

        <div className="my-5">
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
            className={`${
              isEmpty && password === "" ? "border-red-400" : "border"
            } w-full mt-3 p-3 border rounded-xl bg-gray-50`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {isEmpty && password === "" && (
            <p className="text-red-400 mt-2">Please enter your a password</p>
          )} */}
        </div>

        <div className="my-5">
          <label
            className="text-gray-600 block text-xl font-semibold"
            htmlFor="password2"
          >
            Repeat your password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="Repite your password"
            className={`${
              isEmpty && repeatPassword === "" ? "border-red-400" : "border"
            } w-full mt-3 p-3 border rounded-xl bg-gray-50`}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {/* {isEmpty && repeatPassword === "" && (
            <p className="text-red-400 mt-2">Please repeat your password</p>
          )} */}
        </div>

        <input
          type="submit"
          value="SIGN UP"
          className="bg-sky-700 w-full  mb-5 py-3 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg"
        />

        {msg && <Alerta alerta={alerta} />}
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block my-5 px-3 text-center font-semibold text-slate-500 text-sm uppercase"
        >
          Sing in
        </Link>
        <Link
          to="/forgot-password"
          className="block my-5 px-3 text-center font-semibold text-slate-500 text-sm uppercase"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
};

export default SignUp;
