import React from 'react';

import axios from '../axios';

import sortSvg from '../assets/images/sort.svg';
import CommentBlock from './CommentBlock';
import { IAuthorInfo, IVideoInfo } from './RecomendedVideos';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export interface IComment {
  User: IAuthorInfo;
  VideoId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

const VideoDetailsComments: React.FC<IVideoInfo> = (videoInfo) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [showSortOptions, setShowSortOptions] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [commentFocus, setCommentFocus] = React.useState(false);
  const [commentList, setCommentList] = React.useState<IComment[] | []>([]);
  const isAuth = useSelector((state: RootState) => state.isAuth.data);

  React.useEffect(() => {
    axios.get(`/comment/comments?videoId=${videoInfo.id}`).then((res) => setCommentList(res.data));
  }, []);

  const textAreaResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${4}px`;
    }
    const height = textAreaRef.current?.scrollHeight;
    if (typeof textAreaRef.current?.value == 'string') {
      setCommentText(textAreaRef.current?.value);
    }
    if (textAreaRef.current && height) {
      textAreaRef.current.style.height = `${height + 2}px`;
    }
  };

  const choiceSortNew = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!sortBy) {
      setSortBy(true);
    }
  };

  const choiceSortPop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sortBy) {
      setSortBy(false);
    }
  };

  const cancelComment = () => {
    setCommentText('s');
    setTimeout(textAreaResize, 0);
    setCommentText('');
    textAreaRef.current?.blur();
  };

  const postCommentHandler = () => {
    const token = window.localStorage.getItem('token');
    axios
      .post(
        '/comment/comment',
        { content: commentText, videoId: videoInfo.id },
        {
          headers: {
            auth: token,
          },
        },
      )
      .then(async () =>
        axios
          .get(`/comment/comments?videoId=${videoInfo.id}`)
          .then((res) => setCommentList(res.data)),
      );
    cancelComment();
  };

  return (
    <div className="p-4 pt-0 w-10/12">
      <div className="flex text-white items-center">
        <h4>{commentList.length} Comments</h4>
        <div
          onClick={() => {
            setShowSortOptions(!showSortOptions);
          }}
          className="flex items-center cursor-pointer relative">
          <img className="h-8 ml-8" src={sortSvg} alt="error" />
          <h4 className="ml-2 font-bold">Sort by</h4>
          <ul
            className={
              showSortOptions
                ? 'flex-col absolute top-8 left-9 items-center bg-gray-900 rounded-xl transition-opacity'
                : 'flex-col absolute top-8 left-9 items-center bg-gray-900 rounded-xl transition-opacity hidden opacity-0'
            }>
            <li
              onClick={(e) => choiceSortNew(e)}
              className={sortBy ? 'px-4 py-2 bg-gray-700 rounded-t-xl' : 'px-4 py-2'}>
              Newest
            </li>
            <li
              onClick={(e) => choiceSortPop(e)}
              className={sortBy ? 'px-4 py-2' : 'px-4 py-2 bg-gray-700 rounded-b-xl'}>
              Popular
            </li>
          </ul>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="h-14 w-14 rounded-full flex items-center justify-center overflow-hidden relative">
          <img
            className="h-14 min-w-max"
            src={`http://localhost:3001/${isAuth?.image}`}
            alt="error"
          />
        </div>
        <textarea
          onFocus={() => setCommentFocus(true)}
          onBlur={() => setCommentFocus(false)}
          onChange={() => textAreaResize()}
          value={commentText}
          ref={textAreaRef}
          placeholder="Add a comment"
          className="bg-transparent outline-none text-white resize-none ml-4 mt-1 border-b-2 border-gray-300 w-full h-8"
        />
      </div>
      {(commentFocus || commentText) && (
        <div className="flex w-full justify-end text-white">
          <button onClick={cancelComment} className="m-2 py-2 px-4 rounded-2xl hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={postCommentHandler}
            className="m-2 py-2 px-4 bg-green-600 rounded-2xl hover:bg-green-500">
            Comment
          </button>
        </div>
      )}
      {commentList.map((item) => {
        return <CommentBlock key={item.id + item.content} {...item} />;
      })}
    </div>
  );
};

export default VideoDetailsComments;
