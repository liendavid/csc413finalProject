import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {isAuth, logout, getLoggedInUsername} from '../auth/AuthCheck';

const Navbar = () =>  {
    const navigate = useNavigate();

    const goToPage = (page) =>  {
        navigate(page, {replace: true});
    }

    const logoutAction = () =>  {
        logout();
        window.location.reload(false);
    }

    let  [username, setUsername] = useState();

    useEffect(() => {
         getLoggedInUsername().then((result) =>  {
            setUsername(result);

            console.log("found username = " + username);
        });

    }, []);



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

            {isAuth() ? <a href="/channels">Channels</a> : ''}

            {isAuth() ? <a onClick={logoutAction}>Logout ({ username })</a> : ""}

        </div>
    );
};

export default Navbar;