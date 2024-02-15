import AvailableShifts from './AvailableShifts';
import LoginPage from './LoginPage';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import MyShifts from './MyShifts';
import AllShifts from './AllShifts';
import AllPerms from './AllPerms';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element ={<LoginPage/>}/>
    <Route exact path="/available" element ={<AvailableShifts/>}/>
    <Route exact path="/myshifts" element ={<MyShifts/>}/>
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
