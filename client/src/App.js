import './App.css';
import React from 'react';
import Cookies from 'universal-cookie';

import FriendList from "./friends/FriendList";
import SendFriendRequest from "./friends/SendFriendRequest";
import Home from "./structure/Home";

import Navbar from "./structure/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useNavigate} from "react-router";
import SendMessageForm from "./messages/SendMessageForm";
import AuthForm from "./auth/AuthForm";
import ViewFriendRequests from "./friends/ViewFriendRequests";
import IncomingFriendRequests from "./friends/IncomingFriendRequests";
import OutgoingFriendRequests from "./friends/OutgoingFriendRequests";
import  PrivateRoute  from "./structure/PrivateRoute";

import SendChannel from "./channel/SendChannel";

function App() {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isUserOnline, setIsUserOnline] = React.useState(true);

  const navigate = useNavigate();


/*  if (isLoggedIn) {
    return (
        <div className="App">
            <Navbar/>


            <Routes>
                <Route  index element={<Home/>}/>

                <Route   path="/friend-list" element={<FriendList/>}/>
                <Route   path="/send-friend-request" element={<SendFriendRequest/>}/>
                <Route   path="/view-friend-requests" element={<ViewFriendRequests/>}/>

                <Route   path="/auth-form" element={<AuthForm setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route   path="/send-message-form" element={<SendMessageForm/>}/>

                <Route   path="/incoming-friend-requests" element={<IncomingFriendRequests/>}/>
                <Route   path="/outgoing-friend-requests" element={<OutgoingFriendRequests/>}/>
            </Routes>



        </div>
    );
  }*/

{/* React.useEffect(() => {
    const checkUserOnlineStatus = async () => {
      try {
        const response = await fetch('/statusCheck');
        const data = await response.json();
        setIsUserOnline(data.status);
      } catch (error) {
        setIsUserOnline(false);
      }
    };
  
    checkUserOnlineStatus();
    const intervalId = setInterval(checkUserOnlineStatus, 5000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []); */}

{/* <div className={`status-indicator ${isUserOnline ? 'online' : 'offline'}`}>
          {isUserOnline ? 'Online' : 'Offline'}
        </div> */}

  return (


      <div className="App">
          <Navbar/>



          <Routes>
             <Route  index element={PrivateRoute(<Home/>)}/>

              <Route   path="/friend-list" element={PrivateRoute(<FriendList/>)}/>
              <Route   path="/send-friend-request" element={PrivateRoute(<SendFriendRequest/>)}/>
              <Route   path="/view-friend-requests" element={PrivateRoute(<ViewFriendRequests/>)}/>

              <Route   path="/auth-form" element={<AuthForm setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route   path="/send-message-form" element={PrivateRoute(<SendMessageForm/>)}/>

              <Route   path="/incoming-friend-requests" element={PrivateRoute(<IncomingFriendRequests/>)}/>
              <Route   path="/outgoing-friend-requests" element={PrivateRoute(<OutgoingFriendRequests/>)}/>

              <Route   path="/channels" element={PrivateRoute(<SendChannel/>)}/>

          </Routes>



      </div>
  );
}

export default App;