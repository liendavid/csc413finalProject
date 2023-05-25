import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {isAuth, logout, getLoggedInUsername} from '../auth/AuthCheck';
import Cookies from 'universal-cookie';

import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Navbar = () =>  {
    const cookies = new Cookies();
      // profile picture settings
    const [profilePicture, setProfilePicture] = React.useState();
    const [password, setPassword] = React.useState();
    const [userName, setUserName] = React.useState();
    const [imageUpload, setImageUpload] = React.useState(null);
    const [imageRef,setImageRef] = React.useState();

    const navigate = useNavigate();

    const goToPage = (page) =>  {
        navigate(page, {replace: true});
    }

    const logoutAction = () =>  {
        logout();
        window.location.reload(false);
    }

    //maybe allow user to set the status as a server call

    let  [username, setUsername] = useState();
    let  [isUserOnline, setIsUserOnline] = useState(true);

    useEffect(() => {
         getLoggedInUsername().then((result) =>  {
            setUsername(result);

            console.log("found username = " + username);
        });

    }, []);

    useEffect(() => {
        const checkUserOnlineStatus = async () => {
          try {
            const body = {
                userName: username,
            };
            const httpSettings = {
                body: JSON.stringify(body),
                method: 'GET'
            };
            const response = await fetch('/statusCheck', httpSettings);
            const data = await response.json();
            setIsUserOnline(data.status);
          } catch (error) {
            setIsUserOnline(false);
          }
        };
        // this calls the status function
        checkUserOnlineStatus(); 
        // this calls the status function every 5 seconds
        const intervalId = setInterval(checkUserOnlineStatus, 5000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);

      async function displayProfilePicture() {
        const httpSettings = {
          method: 'GET',
          headers: {
            auth: cookies.get('auth'), // utility to retrive cookie from cookies
          }
        };
        const result = await fetch('/getProfilePicture', httpSettings);
        const apiRes = await result.json();
        if (apiRes.status) {
          // worked
          setProfilePicture(apiRes.data[0].profilePicture); // java side should return profile picture 
        } else {
        }
      }

      async function onChangeProfilePicture(e){
        let file = e.target.files[0];
        let imgPath = `images/${file.name + v4() + ".png"}`; 
        if(file){
          uploadBytes(ref(storage, imgPath),file).then(() => {
            getDownloadURL(ref(storage, imgPath)).then((url) => {
              setProfilePicture(url);
              toMongo(url);
            });
          })
        }
      };
     
      async function toMongo(url) { 
        const body = {
          userName: userName,
          password, password,
          profilePicture: url,
        };
        const httpSettings = {
          body: JSON.stringify(body),
          method: 'POST',
          headers: {
            auth: cookies.get('auth'), // utility to retrive cookie from cookies
          }
        };
        const result = await fetch('/setProfilePicture', httpSettings);
        const apiRes = await result.json();
        //console.log(apiRes);
        displayProfilePicture();
      };

    return (
        <div className="navbar">
            <Link to="/">Home</Link>

            <Link to="/auth-form">Authorization</Link>

            {isAuth() ? <a href="/send-message-form">Messages Feature</a> : ''}

            {isAuth() ?
                <div className="dropdown">
                    <button className="dropdown-button">Friends Feature
                        <i className="fa fa-caret-down" aria-hidden="true"/>
                    </button>
                    <div className="dropdown-content">
                        <a href="#" onClick={() => {goToPage("/friend-list")}}>Friend List</a>
                        <a href="#" onClick={() => {goToPage("/send-friend-request")}}>Send Friend Request</a>
                        <a href="#" onClick={() => {goToPage("/view-friend-requests")}}>View Friend Requests</a>
                    </div>
                </div>
                : ''}

            {isAuth() ? <a onClick={logoutAction}>Logout ({ username })</a> : ""}

            {isAuth() ?
                <div className="dropdown">
                    <button className="dropdown-button">
                    <span className={`status-indicator ${isUserOnline ? 'online' : 'offline'}`} />
                    <i className="fa fa-caret-down" aria-hidden="true"/>
                    </button>
                    <div className="dropdown-content">
                        <a href="#" onClick={() => {goToPage("/friend-list")}}>Online</a>
                        <a href="#" onClick={() => {goToPage("/send-friend-request")}}>Away</a>
                        <a href="#" onClick={() => {goToPage("/view-friend-requests")}}>Do not Disturb</a>
                    </div>
                </div>
                : null}

            {/* <div className={`status-indicator ${isUserOnline ? 'online' : 'offline'}`}>
                {isUserOnline ? 'Online' : 'Offline'}
            </div> */}
            {isAuth() ?
                <div class ="wrapper" style={{float: 'right'}}>    
                    <div class="image-button">
                        <img class="image" style={{border: 'solid white', borderWidth: 2, borderRadius: '50%', width: 60, height: 60, objectFit: 'cover'}} src={profilePicture}/>
                        <div class="middle">
                            <div class="text">Change Picture</div>
                        </div>
                    </div>
                    <input type="file" onChange={onChangeProfilePicture} />
                </div>
            :null}
        
        </div>
    );
};

export default Navbar;