import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { LoadingAnimation } from "../../components/Loading.tsx";

import {
  useAppDispatch,
  useAppSelector,
} from "../../feautures/store/store.tsx";
import toast from "react-hot-toast";

import { HOME_ROUTE, SIGNUP_ROUTE } from "../../constants.ts";

import {
  selectAuthError,
  selectBtnLoading,
} from "../../feautures/authslice/AuthSelectors.tsx";
import { loginUser } from "../../feautures/authslice/AuthApi.tsx";

const Login = () => {
  const btnLoading = useAppSelector(selectBtnLoading);
  const error = useAppSelector(selectAuthError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password })).unwrap();
    toast.success("Login successful!");
    navigate(HOME_ROUTE);
  };
  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast if registration fails
    }
  }, [error]);

  return (
    <div className="min-h-screen flex text-white  justify-center items-center">
      <div className="bg-black/70 p-8 rounded-lg min-w-96 ">
        <div className="flex justify-center mb-4">
          <h2 className="text-2xl">Login to Trello</h2>
        </div>

        <form onSubmit={submitHandler}>
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
            {btnLoading ? <LoadingAnimation /> : "Login"}
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
              <Link
                to={SIGNUP_ROUTE}
                className="font-medium text-pinterest hover:underline"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
