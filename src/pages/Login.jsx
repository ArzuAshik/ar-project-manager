import React, { useState } from "react";
import { logo } from "../assets/images";
import LoginForm from "../components/LoginForm";
import USERS_LIST from "../constData/users";

export default function Login() {
  const [show, setShow] = useState(false);
  const [select, selectUser] = useState("arzu2050@gmail.com");

  return (
    <div className="h-screen flex items-center justify-center gap-10">
      {show && (
        <div className="max-w-md w-full max-h-screen overflow-y-auto py-10">
          <ul className="border rounded-xl p-2">
            <li className="bg-blue-100 font-bold my-1 px-3 py-1 rounded-xl sticky top-0">
              Password: 123456
            </li>
            {USERS_LIST.map(({ id, email }) => (
              <li
                onClick={() => selectUser(email)}
                key={id}
                className="bg-slate-100 my-1 px-3 py-1 rounded-xl cursor-pointer"
              >
                {id}. {email}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Learn with sumit"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <LoginForm select={select} />

        <div>
          <button
            className="rounded-full bg-orange-200 ring-2 ring-orange-400 py-1 px-6 text-red-700 relative"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide Users" : "Show Users"}
            <span className="absolute bg-orange-300 ring-3 ring-orange-400 inset-0 m-auto w-2/3 -z-10 rounded-full animate-ping" />
          </button>
        </div>
      </div>
    </div>
  );
}
