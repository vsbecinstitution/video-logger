import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';
import Home from "./Home"
import Login from './Login';
import Register from './Register';
import AdminLogin from "./Adminlogin"
import Admin from "./Admin"
import { BrowserRouter } from "react-router-dom";


function App() {
  

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/adminlogin" element = {<AdminLogin/>}/>
        <Route path = "/admin" element = {<Admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;