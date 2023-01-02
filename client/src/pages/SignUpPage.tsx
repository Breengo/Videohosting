import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideSideBar } from '../redux/slices/showSideBarSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from '../axios';

import defaultImage from '../assets/images/cat.jpg';
import imgIcon from '../assets/images/img.svg';

const SignUpPage = () => {
  const [userImage, setUserImage] = React.useState<string>(defaultImage);
  const [onImageHover, setImageHover] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  const debounceTimerErrorRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const onSubmit = handleSubmit((data) => {
    setServerError(false);
    axios
      .post(
        '/user/registration',
        { name: data.name, email: data.email, password: data.password, image: data.image[0] },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            cors: 'no-cors',
          },
        },
      )
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

  function onImageUploadHandler() {
    let reader = new FileReader();
    if (getValues('image')[0]) {
      reader.readAsDataURL(getValues('image')[0]);
    }
    reader.onload = () => {
      if (typeof reader.result == 'string') {
        setUserImage(reader.result);
      }
    };
  }

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
        <h1 className="text-center text-4xl mb-8 text-green-500">SIGN UP</h1>
        <input
          autoComplete="off"
          placeholder="Email"
          {...register('email', { required: true, minLength: 6 })}
          className={
            errors.name || serverError
              ? 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-red-500 border-2'
              : 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-gray-500 border-2'
          }
          type="text"
        />
        {errors.email && <h4 className="text-red-500 mt-2">Incorrect email</h4>}
        <input
          autoComplete="off"
          placeholder="Username"
          {...register('name', { required: true, minLength: 4 })}
          className={
            errors.name || serverError
              ? 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-red-500 border-2'
              : 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-gray-500 border-2'
          }
          type="text"
        />
        {errors.name && <h4 className="text-red-500 mt-2">Incorrect username</h4>}
        {serverError && <h4 className="text-red-500 mt-2">{serverError}</h4>}
        <input
          autoComplete="off"
          placeholder="Password"
          {...register('password', { required: true, minLength: 6 })}
          className={
            errors.password || errors.confPass
              ? 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-red-500 border-2'
              : 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-gray-500 border-2'
          }
          type="password"
        />
        {errors.password && <h4 className="text-red-500 mt-2">Incorrect password</h4>}
        <input
          autoComplete="off"
          {...register('confPass', {
            required: true,
            validate: () => getValues('password') == getValues('confPass'),
          })}
          placeholder="Confirm password"
          className={
            errors.confPass
              ? 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-red-500 border-2'
              : 'p-4 text-2xl rounded-lg outline-none bg-gray-500 mt-6 border-gray-500 border-2'
          }
          type="password"
        />
        {errors.confPass && <h4 className="text-red-500 mt-2">Passwords do not match</h4>}
        <label
          htmlFor="userImage"
          onMouseOver={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
          className="flex items-center cursor-pointer bg-gray-500 p-4 rounded-xl hover:bg-gray-600 my-4">
          <div className="h-24 w-24 rounded-full border-2 flex items-center justify-center overflow-hidden relative">
            <img
              className={
                onImageHover
                  ? 'border-gray-300 h-24 min-w-max opacity-60'
                  : 'border-gray-300 h-24 min-w-max'
              }
              src={userImage}
              alt="error"
            />
            {onImageHover && <img src={imgIcon} alt="error" className="absolute h-12 opacity-60" />}
          </div>
          <h3 className="ml-4 text-3xl">{onImageHover ? 'Upload image' : 'User image'}</h3>
        </label>
        <input
          {...register('image', { onChange: onImageUploadHandler })}
          className="hidden"
          id="userImage"
          type="file"
        />
        <button
          type="submit"
          className="p-4 bg-green-500 mt-8 rounded-xl text-3xl font-bold cursor-pointer hover:bg-green-600">
          Register
        </button>
        <div className="flex justify-center mt-4 text-gray-400 text-xl">
          <Link to="/sign_in/" className="text-white cursor-pointer hover:underline">
            Already have an account? <span className="text-blue-400">Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
