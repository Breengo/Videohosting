import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { hideSideBar } from '../redux/slices/showSideBarSlice';
import { fetchIsAuth } from '../redux/slices/authSlice';
import axios from '../axios';

import uploadSvg from '../assets/images/upload.svg';
import { AppDispatch } from '../redux/store';
import { resetAll, setUpload } from '../redux/slices/currentPageSlice';

export default function UploadVideoPage() {
  const [serverError, setServerError] = React.useState(false);
  const [drag, setDrag] = React.useState(false);
  const [video, setVideo] = React.useState<string | null>(null);
  const videoFileRef = React.useRef<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });

  React.useEffect(() => {
    dispatch(hideSideBar());
    dispatch(resetAll());
    dispatch(setUpload());
    const token = window.localStorage.getItem('token');
    if (token) dispatch(fetchIsAuth(token));
  }, []);

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);
    videoFileRef.current = files[0];
    if (files[0].type == 'video/mp4') {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (typeof reader.result == 'string') setVideo(reader.result);
      };
    }
    setDrag(false);
  }

  function onDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight + 4}px`;
  }

  const onSubmit = handleSubmit((data) => {
    setServerError(false);
    const token = window.localStorage.getItem('token');
    const file = videoFileRef.current;
    axios
      .post(
        '/video/upload',
        { title: data.title, description: data.description, file },
        {
          headers: {
            auth: token,
            'Content-Type': 'multipart/form-data',
            cors: 'no-cors',
          },
        },
      )
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="bg-gray-800 w-full min-h-screen overflow-x-hidden">
      {video ? (
        <form onSubmit={onSubmit} className="w-full flex justify-center overflow-x-hidden">
          <div className="mt-28 w-screen flex justify-center overflow-x-hidden">
            <div className="flex-col justify-center overflow-x-hidden">
              <video className="w-full overflow-x-hidden" src={video} controls />
              <input
                {...register('title', { required: true, minLength: 5 })}
                type="text"
                maxLength={96}
                placeholder="Video title"
                className={
                  errors.title
                    ? 'text-white font-bold mt-4 text-2xl bg-transparent border-red-500 border-2 w-full focus:border-white rounded-lg p-2 outline-none'
                    : 'text-white font-bold mt-4 text-2xl bg-transparent border-gray-500 border-2 w-full rounded-lg p-2 border-dashed outline-none'
                }
              />
              {errors.title && <h4 className="text-red-500">Title is too short</h4>}
              <textarea
                {...register('description', { required: true, minLength: 25 })}
                className={
                  errors.description
                    ? 'text-white rounded-lg resize-none bg-transparent border-red-500 border-2 w-full focus:border-white mt-4 p-2 outline-none'
                    : 'text-white rounded-lg resize-none bg-transparent border-gray-500 border-2 w-full focus:border-white border-dashed mt-4 p-2 outline-none'
                }
                maxLength={3600}
                onChange={(e) => onDescriptionChange(e)}
                placeholder="Video description"
              />
              {errors.description && <h4 className="text-red-500">Description is too short</h4>}
              <button
                type="submit"
                className="w-full bg-green-600 p-4 mt-4 mb-12 text-white rounded-lg hover:bg-green-700">
                Upload
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div
          onDragOver={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragStart={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
          className="h-screen w-screen flex items-center justify-center">
          <div
            className={
              drag
                ? 'flex items-center justify-center text-white border-dashed border-2 border-gray-300 w-11/12 h-5/6 mt-5'
                : 'flex items-center justify-center text-white border-dashed border-2 border-gray-800 w-11/12 h-5/6 mt-5'
            }>
            <img className="mr-4 h-24" src={uploadSvg} alt="error" />
            <h2 className="font-bold text-3xl mt-4">Drag video here</h2>
          </div>
        </div>
      )}
    </div>
  );
}
