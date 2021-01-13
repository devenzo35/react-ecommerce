import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { firebase } from "../../firebase/firebaseConfig";
import { loginUser } from "../../store/actions/auth";
import logo from "../../assets/28-289549_png-file-e-commerce-icon-png-clipart.png";

export const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const [state, setstate] = useState(null);

  const password = watch("password");

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { name, email, password, password2 } = data;

    if (password !== password2) return;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        localStorage.setItem("user", JSON.stringify({ name, uid: user.uid }));
        dispatch(loginUser(user.displayName, user.uid));
      })
      .catch((e) => {
        setstate(e.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5 py-12 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-md w-full space-y-9 h-4/5 animate__animated animate__fadeInRightBig">
        <div>
          <img className="mx-auto h-14 w-auto" src={logo} alt="Workflow"></img>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 h-80"
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                ref={register({ required: true })}
              ></input>
              {errors.name && (
                <span className="flex items-center p-2 pl-0 font-bold">
                  <i className="fas fa-exclamation-circle fa-sm"></i>
                  <span className="text-xs ml-1">
                    Name is an obligatory field
                  </span>
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                ref={register({ required: true })}
              ></input>
              {errors.email && (
                <span className="flex items-center p-2 pl-0 font-bold">
                  <i className="fas fa-exclamation-circle fa-sm"></i>
                  <span className="text-xs ml-1">
                    Please enter a valid email
                  </span>
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={register({ required: true })}
              ></input>
              {errors.password && (
                <span className="flex items-center p-2 pl-0 font-bold">
                  <i className="fas fa-exclamation-circle fa-sm"></i>
                  <span className="text-xs ml-1">
                    Password must have 8 or more characters
                  </span>
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password2" className="sr-only">
                Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="confirm your password"
                ref={register({
                  required: true,
                  validate: (value) => value === password,
                })}
              ></input>
              {errors.password2 && (
                <span className="flex items-center p-2 pl-0 font-bold">
                  <i className="fas fa-exclamation-circle fa-sm"></i>
                  <span className="text-xs ml-1">
                    Passwords must be the same
                  </span>
                </span>
              )}
            </div>
          </div>
          <>
            <div className="text-sm text-right hover:underline">
              <Link
                to="/auth/login"
                className="font-medium text-gray-900 hover:text-gray-500"
              >
                Do you already have an account?
              </Link>
            </div>
            <div className="w-max m-auto">
              {state && (
                <span className="border-b-2 mx-auto border-red-700 text-center text-md">
                  {state}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign up
            </button>
          </>
        </form>
      </div>
    </div>
  );
};
