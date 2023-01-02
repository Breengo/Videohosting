import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import MainPage from './pages/MainPage';
import VideoDetails from './pages/VideoDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UploadVideoPage from './pages/UploadVideoPage';
import SearchPage from './pages/SearchPage';
import LikedVideosPage from './pages/LikedVideosPage';
import ChannelDetailsPage from './pages/ChannelDetailsPage';

const App: React.FC = () => {
  const sideBarState = useSelector((state: RootState) => state.sideBar.show);

  return (
    <div className="App">
      <Navbar />
      {sideBarState && <Sidebar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subscriptions/" element={<SubscriptionsPage />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/sign_in/" element={<SignInPage />} />
        <Route path="/sign_up/" element={<SignUpPage />} />
        <Route path="/upload/" element={<UploadVideoPage />} />
        <Route path="/search/:request" element={<SearchPage />} />
        <Route path="/liked/" element={<LikedVideosPage />} />
        <Route path="/channel_details/:id" element={<ChannelDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
