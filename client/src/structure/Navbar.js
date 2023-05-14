import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import React from "react";
import {isAuth, logout} from '../auth/AuthCheck';

const Navbar = () =>  {
    const [isLoggedIn] = React.useState(false);

    const navigate = useNavigate();

    const goToPage = (page) =>  {
        navigate(page, {replace: true});
    }

    const logoutAction = () =>  {
        logout();
        window.location.reload(false);
    }

    return (
        <div className="navbar">
            <Link to="/">Home</Link>

            <Link to="/auth-form">Authentication</Link>


            {isLoggedIn ? <a href="#">Messages Feature</a> : ''}

            {!isLoggedIn ?
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

            {isAuth() ? <a onClick={logoutAction}>Logout</a> : ""}
        </div>
    );
};

export default Navbar;