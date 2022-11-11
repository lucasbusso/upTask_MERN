import React from 'react'

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-center text-4xl">
       Reset your password
      </h1>
      <form className="my-10 bg-white rounded-md shadow-lg p-10">

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
    </>
  );
}

export default NewPassword