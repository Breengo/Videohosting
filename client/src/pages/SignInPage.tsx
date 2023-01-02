import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideSideBar } from '../redux/slices/showSideBarSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const SignInPage = () => {
  const [serverError, setServerError] = React.useState(false);

  const debounceTimerErrorRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const onSubmit = handleSubmit((data) => {
    setServerError(false);
    axios
      .post('/user/login', { email: data.email, password: data.password })
      .then((res) => {
        window.localStorage.setItem('token', res.data.message);
        navigate('/');
      })
      .catch((err) => {
        setServerError(err.response.data.message);
        if (debounceTimerErrorRef.current) {
          clearTimeout(debounceTimerErrorRef.current);
        }
        debounceTimerErrorRef.current = setTimeout(() => {
          setServerError(false);
        }, 3000);
      });
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(hideSideBar());
  }, []);
  return (
    <div className="flex w-screen h-screen bg-gray-800 items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col text-white bg-gray-700 p-8 rounded-xl justify-center font-bold"
        action="submit">
        <h1 className="text-center text-4xl mb-8 text-green-500">SIGN IN</h1>
        <input
          {...register('email', { required: true })}
          placeholder="Email"
          className={
            errors.email
              ? 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-2 border-red-500'
              : 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-2 border-gray-500'
          }
          type="text"
        />
        {errors.email && <h4 className="text-red-500 mt-2">Enter email</h4>}
        <input
          {...register('password', { required: true })}
          placeholder="Password"
          className={
            errors.password
              ? 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-2 border-red-500'
              : 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-2 border-gray-500'
          }
          type="password"
        />
        {errors.password && <h4 className="text-red-500 mt-2">Incorrect password</h4>}
        <div className="flex justify-between text-gray-400 text-xl mt-6">
          <h2 className=" cursor-pointer hover:underline">Forgot Password</h2>
          <Link to="/sign_up/" className="text-blue-500 cursor-pointer hover:underline">
            Sign Up
          </Link>
        </div>
        <button
          type="submit"
          className="p-4 bg-green-500 mt-8 rounded-xl text-3xl font-bold cursor-pointer hover:bg-green-600">
          Login
        </button>
        {serverError && <h4 className="text-red-500 mt-4 text-center text-xl">{serverError}</h4>}
      </form>
    </div>
  );
};

export default SignInPage;
