import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';


function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
     
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
     <Route path="/signin" element={<Login />} />
     <Route path="/signup" element={<Register />} />
     {/* <Route path="/logout" element={<Logout />} /> */}
 
     {/* <Route path="*" element={<Error />} /> */}
     </Routes>
    </div>
  );
}

export default App;
