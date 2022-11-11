import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-gray-700 font-black text-center text-4xl">
        Reset your password
      </h1>
      <form className="my-10 bg-white rounded-md shadow-lg p-10">
        <div className="my-5">
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
          />
        </div>

        <input
          type="submit"
          value="Send password reset email"
          className="bg-sky-700 w-full  mb-5 py-3 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800 hover:shadow transition-all shadow-lg"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block my-5 text-center text-slate-500 text-sm uppercase"
        >
          Back to <span className="text-sky-700 text-bold">sign in</span> page
        </Link>
      </nav>
    </>
  );
}

export default ForgotPassword