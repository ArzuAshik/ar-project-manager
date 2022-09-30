import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "../features/auth/authApi";

const initialValues = { email: "arzu2050@gmail.com", password: "123456" };
export default function LoginForm({ select }) {
  const [handleLogin, { isLoading, isError, error }] = useLoginMutation();
  const [input, setInput] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(input);
  };

  const handleChange = (e) => {
    setInput((currentValue) => ({
      ...currentValue,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!isError) return;
    toast.error("Something Wrong!");
  }, [isError, error]);

  useEffect(() => {
    setInput({ email: select, password: "123456" });
  }, [select]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label className="sr-only">Email address</label>
          <input
            name="email"
            type="email"
            value={input.email}
            onChange={handleChange}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label className="sr-only">Password</label>
          <input
            name="password"
            type="password"
            value={input.password}
            onChange={handleChange}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
