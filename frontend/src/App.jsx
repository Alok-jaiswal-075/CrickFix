import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import NewTeam from "./components/NewTeam";
import AllTeams from "./components/AllTeams";
import AllPlayers from "./components/AllPlayers";
import EditPlayer from "./components/EditPlayer";
import EditTeam from "./components/EditTeam";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/newTeam" element={<NewTeam/>} />
      <Route path="/teams" element={<AllTeams/>} />
      <Route path="/allplayers" element={<AllPlayers/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/editPlayer" element={<EditPlayer />} />
      <Route path="/team/:id" element={<EditTeam />} />
      <Route path="/scoreboard" element={<ScoreBoard />} />
      {/* <Route path="*" element={<Error />} /> */}

     </Routes>
    </div>


  );
}

export default App;
