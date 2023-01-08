import React from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SidebarSmall = () => {
  const current = useSelector((state: RootState) => state.curPage);
  const isAuth = useSelector((state: RootState) => state.isAuth);
  return (
    <div className="text-white text-xs h-screen xl:flex flex-col bg-gray-900 w-24 fixed px-2 pt-32 items-center hidden">
      <Link
        to="/"
        className="inline flex flex-col justify-center items-center text-center w-full cursor-pointer hover:bg-gray-600 p-2 rounded-xl w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={current.home ? "white" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z" />
        </svg>
        <h3 className="text-center w-full">Home</h3>
      </Link>
      {isAuth.data && (
        <>
          <Link
            to="/subscriptions/"
            className="inline flex flex-col justify-center items-center mt-4 cursor-pointer hover:bg-gray-600 p-2 rounded-xl w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={current.subs ? "white" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <h3 className="text-center">Subscriptions</h3>
          </Link>
          <Link
            to="/upload/"
            className="inline flex flex-col justify-center items-center mt-4 cursor-pointer hover:bg-gray-600 p-2 rounded-xl w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <h3 className="text-center">Upload</h3>
          </Link>
          <Link
            to="/liked/"
            className="inline flex flex-col justify-center items-center mt-4 cursor-pointer hover:bg-gray-600 p-2 rounded-xl w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={current.liked ? "white" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            <h3 className="text-center">Liked</h3>
          </Link>
        </>
      )}
    </div>
  );
};

export default SidebarSmall;
