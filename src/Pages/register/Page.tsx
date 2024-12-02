import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../../components/Loading";
import { useAppDispatch, useAppSelector } from "../../feautures/store/store";
import toast from "react-hot-toast";
import { LOGIN_ROUTE } from "../../constants";

import {
  selectAuthError,
  selectBtnLoading,
} from "../../feautures/authslice/AuthSelectors";
import { registerUser } from "../../feautures/authslice/AuthApi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Access the auth state to monitor login status
  const btnLoading = useAppSelector(selectBtnLoading);
  const error = useAppSelector(selectAuthError);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(registerUser({ name, email, password })).unwrap();

    navigate(LOGIN_ROUTE);
    toast.success("Registration successful! Please log in.");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div className="min-h-screen flex text-white  justify-center items-center">
      <div className="bg-black/70 p-8 rounded-lg min-w-96 ">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register to Trello
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="p-1 text-black rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="p-1 text-black rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="p-1 text-black rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-slate-700 text-white font-semibold rounded-md shadow-sm focus:outline-none active:scale-95"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingAnimation /> : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            <span>
              Not on Trello yet?
              <Link to={LOGIN_ROUTE} className="hover:underline font-semibold">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
