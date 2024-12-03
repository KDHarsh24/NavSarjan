

import {Routes,Route} from 'react-router-dom';
import Login from './component/loginPage';
import { useState,useEffect } from 'react';

import Chat from './component/CHAT/chat';
import Home from './component/Home.js'
import Notify from './component/Notification/Notification.js';




function App() 
{
  const [uName,setUname]=useState('');
  const [socket,setSocket]=useState('');
  console.log("user: "+uName);
  
   console.log("Socket in App: "+socket);
  
  return (
    <>
        <Routes>
            <Route  path="/"   element={<Login  user={setUname} />}/>
            <Route path="/home" element={<Home user={uName} socketValue={setSocket} />} />
            <Route path="/home/chat" element={<Chat  user={uName}  socket={socket}/>} />
            <Route path="/home/notification"  element={<Notify user={uName} socket={socket}/>} />
        </Routes>
    </>
  );
    

}

export default App;
/*
  <Routes>
        <Route  path="/"   element={element}/>
  </Routes>
 */