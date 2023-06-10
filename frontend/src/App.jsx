import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home'
import Login from './components/players/Login';
import Register from './components/players/Register';
import About from './components/players/About';
import NewTeam from "./components/teams/NewTeam";
import AllTeams from "./components/teams/AllTeams";
import AllPlayers from "./components/players/AllPlayers";
import EditPlayer from "./components/players/EditPlayer";
import EditTeam from "./components/teams/EditTeam";
import ScoreBoard from "./components/matches/ScoreBoard";
import TeamRequests from "./components/teams/TeamRequests"
import TeamDashboard from "./components/TeamDashboard";

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
      <Route path="/teamRequests/:id" element={<TeamRequests />} />
      <Route path="/teamRequests/:id" element={<TeamRequests />} />
      <Route path="/dashboard/" element={<TeamDashboard />} />
      {/* <Route path="*" element={<Error />} /> */}

     </Routes>
    </div>


  );
}

export default App;
