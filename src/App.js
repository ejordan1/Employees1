import AvailableShifts from './AvailableShifts';
import LoginPage from './LoginPage';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element ={<LoginPage/>}/>
    <Route exact path="/available" element ={<AvailableShifts/>}/>
    </Routes>
    <div className="App">

     <Navbar></Navbar>
    </div>
    </BrowserRouter>
  );
}

export default App;
