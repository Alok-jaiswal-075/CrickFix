import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import NewTeam from "./components/NewTeam";
import AllTeams from "./components/AllTeams";

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/newTeam" element={<NewTeam/>} />
      <Route path="/teams" element={<AllTeams/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="*" element={<Error />} /> */}

     </Routes>
    </div>
  );
}

export default App;
