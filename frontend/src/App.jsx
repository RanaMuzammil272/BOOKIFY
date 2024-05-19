import { useState } from 'react'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext, socket } from "./context/appContext";
import { useSelector } from "react-redux";

import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import MyFotter from './components/MyFotter'
import { useLocation } from 'react-router-dom';
function App() {
  const [isAdmin,setAdmin]=useState(null);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const location = useLocation();

  // Check if the current location is the Home component
  const isLogin = location.pathname === '/login';
  const isHome = location.pathname === '/';
  const user = useSelector((state) => state.user);
  return (
    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages,isAdmin,setAdmin }}>
      {!isLogin && <Navbar />} 
      <div className='min-h-screen'>
        <Outlet />
      </div>
      {isHome && <MyFotter />} 
    </AppContext.Provider>
  );
}

export default App
