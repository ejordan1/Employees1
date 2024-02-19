import AvailableShifts from './Components/AvailableShifts';
import LoginPage from './Components/LoginPage';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import MyShifts from './Components/MyShifts';
import AllShifts from './Components/AllShifts';
import AllPerms from './Components/AllPerms';
import MyPerms from './Components/MyPerms';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element ={<LoginPage/>}/>
    <Route exact path="/available" element ={<AvailableShifts/>}/>
    <Route exact path="/myshifts" element ={<MyShifts/>}/>
    <Route exact path="/myperms" element ={<MyPerms/>}/>
    <Route exact path="/allshifts" element ={<AllShifts/>}/>
    <Route exact path="/allperms" element ={<AllPerms/>}/>
    </Routes>
    <div className="App">

     <Navbar></Navbar>
    </div>
    </BrowserRouter>
  );
}

export default App;
