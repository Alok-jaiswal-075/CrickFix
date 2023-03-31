import {Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
// import About from './components/About';


function App() {
  return (
    <div className="App">
      <Navbar/>

      <Route exact path='/'>
        <Home/>
      </Route>

      {/* <Route exact path='/about'>
        <About/>
      </Route> */}

      <Route exact path='/login'>
        <Login/>
      </Route>

      <Route exact path='/register'>
        <Register/>
      </Route>
    </div>
  );
}

export default App;
