import React from "react";
import {Routes, Route} from "react-router-dom"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import getCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import { Navigate } from "react-router-dom";

function App(){

  getCurrentUser();
  let {userData} = useSelector(state=>state.user);
  if (userData === null) return <div>Loading...</div>;

  return (
    <>
      
      <Routes>

        {/* Protected Routes */}
        <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />

      </Routes>
    
    
    </>
  )
}

export default App;