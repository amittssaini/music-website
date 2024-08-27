import SearchAppBar from "./Component/Header";
import Header from "./Component/Header";
import { Routes,Route ,Navigate, BrowserRouter as Router} from 'react-router-dom'
import Signup from "./Component/Signup";
import SongCard from "./Component/SongCard";
import Songs from "./Component/Songs";
import Signin from "./Component/Signin";
import './Style/sigup.css'
import Playlist from "./Component/Playlist";
export const config = {
  endpoint: `http://localhost:8082`,
};
function App() {
  return (
    <div >
        <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/playlist" element={<Playlist />} />
        <Route path="/" element={<Navigate to="/auth/signin" />} />
        {/* <Route path="*" element={<Navigate to="/auth/signup" />} /> Fallback for undefined routes */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
