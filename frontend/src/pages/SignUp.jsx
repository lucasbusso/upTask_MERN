import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-center text-4xl">
        Manage your <span className="text-slate-700"> projects</span>
      </h1>
      <form className="my-10 bg-white rounded-md shadow-lg p-10">
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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="SIGN UP"
          className="bg-sky-700 w-full  mb-5 py-3 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block my-5 text-center text-slate-500 text-sm uppercase"
        >
          Sing in
        </Link>
        <Link
          to="/forgot-password"
          className="block my-5 text-center text-slate-500 text-sm uppercase"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
}

export default Register