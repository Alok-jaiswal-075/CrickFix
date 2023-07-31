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

import ChoosePlayers from './components/matches/ChoosePlayers'
import ChoosePlayersTeam2 from './components/matches/ChoosePlayersTeam2'
import ChooseTeam from "./components/matches/ChooseTeam";
import ChooseOpponent from "./components/matches/ChooseOpponent";
import MatchRequests from './components/matches/MatchRequests'


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
      <Route path="/team/:id" element={<TeamDashboard/>} />
      <Route path="/editTeam/:id" element={<EditTeam/>} />
      <Route path="/match/scoreboard/:matchId" element={<ScoreBoard />} />
      <Route path="team/teamRequests/:id" element={<TeamRequests />} />
      <Route path="team/matchRequests/:id" element={<MatchRequests />} />
      <Route path="/match/chooseplayers" element={<ChoosePlayers />} />
      <Route path="/match/creatematch" element={<ChooseTeam />} />
      <Route path="/match/creatematch/:team1" element={<ChooseOpponent />} />
      <Route path="/match/creatematch/:team1/:team2" element={<ChoosePlayers />} />
      <Route path="/match/match_request_accept/:matchId" element={<ChoosePlayersTeam2 />} />
      {/* <Route path="/dashboard/" element={<TeamDashboard />} /> */}
      {/* <Route path="*" element={<Error />} /> */}

     </Routes>
    </div>


  );
}

export default App;
