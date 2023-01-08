import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { toggleSideBar } from "../redux/slices/showSideBarSlice";
import { userQuit } from "../redux/slices/authSlice";

import logo from "../assets/images/logo.svg";
import signInSvg from "../assets/images/user.svg";
import logOutSvg from "../assets/images/exit.svg";
import settingsSvg from "../assets/images/settings.svg";
import languageSvg from "../assets/images/language.svg";
import helpSvg from "../assets/images/help.svg";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [outline, setOutline] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const isAuth = useSelector((state: RootState) => state.isAuth.data);

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const onUserQuit = () => {
    window.localStorage.removeItem("token");
    dispatch(userQuit());
  };

  function onSearchHandler(e?: React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }
    if (searchInputRef.current?.value) {
      navigate(`/search/${searchInputRef.current?.value}`);
    }
  }

  return (
    <nav className="grid grid-cols-3  items-center p-4 bg-gray-900 fixed w-screen z-10 top-0 left-0 z-50">
      <div className="flex items-center">
        <svg
          onClick={() => dispatch(toggleSideBar())}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-8 h-8 mt-1 cursor-pointer hover:bg-gray-500 rounded-2xl p-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <Link
          to="/"
          className="font-bold text-white inline text-3xl ml-4 flex items-center select-none"
        >
          <img className="h-10" src={logo} alt="error" />
          Video
        </Link>
      </div>
      <form
        ref={formRef}
        onClick={() => searchInputRef.current?.focus()}
        onSubmit={(e) => onSearchHandler(e)}
        className={
          outline
            ? "flex items-center bg-gray-500 rounded-xl border-indigo-500 border-4 cursor-pointer"
            : "flex items-center bg-gray-500 rounded-xl border-gray-700 border-4 cursor-pointer"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          onClick={() => onSearchHandler()}
          className="w-10 rounded-l-lg p-2  hover:bg-indigo-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          ref={searchInputRef}
          onFocus={() => {
            setOutline(true);
          }}
          onBlur={() => {
            setOutline(false);
          }}
          type="text"
          className="cursor-pointer w-full bg-transparent text-white border-gray-300 rounded-3xl outline-black text-xl px-4 py-1 outline-0"
        />
      </form>
      <div className="flex items-center justify-self-end mr-12">
        {!isAuth && (
          <Link
            to="/sign_in/"
            className="flex text-blue-600 font-bold items-center py-1 px-2 border-gray-700 border-2 rounded-2xl cursor-pointer hover:bg-gray-700"
          >
            <img
              className="h-8 rounded-3xl cursor-pointer mr-2"
              src={signInSvg}
              alt="error"
            />
            Sign In
          </Link>
        )}
        {isAuth && (
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center cursor-pointer"
          >
            <div className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden relative">
              <img
                className="h-12 min-w-max"
                src={`http://localhost:3001/${isAuth.image}`}
                alt="error"
              />
            </div>
          </div>
        )}
        {isAuth && showUserMenu && (
          <div className="absolute right-8 top-20 bg-gray-700 w-2/12 rounded-xl">
            <div className="text-white flex p-4 border-b-2 border-gray-500 hover:bg-gray-500 cursor-pointer rounded-t-xl">
              <div className="h-16 w-16 rounded-full flex items-center justify-center overflow-hidden relative">
                <img
                  className="h-16 min-w-max"
                  src={`http://localhost:3001/${isAuth.image}`}
                  alt="error"
                />
              </div>
              <div className="px-4 text-lg">
                <h3 className="font-bold">{isAuth.name} </h3>
                <h4>{isAuth.email}</h4>
              </div>
            </div>

            <ul className="text-white">
              <li className="hover:bg-gray-500 cursor-pointer p-2 flex">
                <img className="h-6 mr-4 ml-2" src={languageSvg} alt="error" />{" "}
                <h5>Language</h5>
              </li>
              <li className="hover:bg-gray-500 cursor-pointer p-2 flex">
                <img className="h-6 mr-4 ml-2" src={helpSvg} alt="error" />{" "}
                <h5>Help</h5>
              </li>
              <li className="hover:bg-gray-500 cursor-pointer p-2 flex">
                <img className="h-6 mr-4 ml-2" src={settingsSvg} alt="error" />{" "}
                <h5>Settings</h5>
              </li>
              <li
                onClick={onUserQuit}
                className="hover:bg-gray-500 cursor-pointer rounded-b-xl  p-2 flex"
              >
                <img className="h-6 mr-4 ml-2" src={logOutSvg} alt="error" />{" "}
                <h5>Log Out</h5>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
