
import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup.jsx'
import {Routes , Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
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





function App() {

  return (
    <>

      <Routes>
        //root router
        <Route path= "/" element = {<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/dashboard/profile" element = {<Profile />} />
        <Route path="/video/:videoId" element = {<VideoPlayer />} />
        <Route path='/likedVideos' element={<LikedVideos />} />
        <Route path= '/publishedVideos' element = {<PublishedVideos />} />
        <Route path="/publishPage" element={<PublishPage />} />
        <Route path='/subscribedChannelList' element={<SubscribedChannelsPage />} />
        <Route path='/playlist' element={<PlaylistsPage />} />
        <Route path='/playlist/:playlistId' element={<PlaylistDetailsPage />} />
        <Route path = '/updateUserDetails' element={<UpdateUserDetails />} />
        <Route path='/search' element ={<SearchResults />} />
        <Route path = '/channelDashboard/:channelId' element={<ChannelDashboard />} />
        <Route path='/contact' element={<Support />} />
        
      </Routes>

    </>
  )
}

export default App
