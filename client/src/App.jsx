import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup.jsx'
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Profile from './pages/dashboard/Profile.jsx'
import Home from './pages/home/Home.jsx'
import VideoPlayer from './pages/videoPlayer/VideoPlayer.jsx'
import LikedVideos from './pages/likedVideos/LikedVideos.jsx'
import PublishedVideos from './pages/publish/PublishedVideos.jsx'
import PublishPage from './pages/publish/PublishPage.jsx'
import SubscribedChannelsPage from './pages/subscribedChannelsPage/subscribedChannelsPage.jsx'
import PlaylistsPage from './pages/playlist/PlaylistsPage.jsx'
import PlaylistDetailsPage from './pages/playlist/PlaylistDetailsPage.jsx'
import UpdateUserDetails from './pages/dashboard/UpdateUserDetails.jsx'
import SearchResults from './pages/searchResults/SearchResults.jsx'
import ChannelDashboard from './pages/dashboard/ChannelDashboard.jsx'
import Support from './pages/support/Support.jsx'

import { useAuth } from './context/AuthContext.jsx'

//Protected Route
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace state={{ message: "Please login first to continue." }} />;
  }

  return children;
}

function App() {
  const location = useLocation();

  // Show toast if redirected with message
  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/video/:videoId" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
        <Route path="/likedVideos" element={<ProtectedRoute><LikedVideos /></ProtectedRoute>} />
        <Route path="/publishedVideos" element={<ProtectedRoute><PublishedVideos /></ProtectedRoute>} />
        <Route path="/publishPage" element={<ProtectedRoute><PublishPage /></ProtectedRoute>} />
        <Route path="/subscribedChannelList" element={<ProtectedRoute><SubscribedChannelsPage /></ProtectedRoute>} />
        <Route path="/playlist" element={<ProtectedRoute><PlaylistsPage /></ProtectedRoute>} />
        <Route path="/playlist/:playlistId" element={<ProtectedRoute><PlaylistDetailsPage /></ProtectedRoute>} />
        <Route path="/updateUserDetails" element={<ProtectedRoute><UpdateUserDetails /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
        <Route path="/channelDashboard/:channelId" element={<ProtectedRoute><ChannelDashboard /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Support /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
