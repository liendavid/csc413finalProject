/* View incoming and outcoming friend requests */

import {NavLink, Route, Routes} from "react-router-dom";
import OutgoingFriendRequests from "./OutgoingFriendRequests";
import IncomingFriendRequests from "./IncomingFriendRequests";


import SendFriendRequest from "./SendFriendRequest";
import AuthForm from "../auth/AuthForm";
import SendMessageForm from "../messages/SendMessageForm";
import React from "react";

const ViewFriendRequests = () => {

    return  (
        <div className="ViewFriendRequests">
            <h1>View Friend Requests</h1>

            <div className="content">
               <nav style={
                   {
                       color: 'white',

                       backgroundColor: 'purple',

                       padding: '2em'
                   }
               }>
                   <NavLink to={ '/incoming-friend-requests'} style={{
                       textDecoration: 'none',
                       color: 'white',
                       fontWeight: 'bold',

                       padding: '1em',
                       margin: '1em',

                       backgroundColor: '#4d15b3',


                   }}>Incoming Friend Requests</NavLink>
                   <NavLink to="/outgoing-friend-requests"

                style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'bold',

                    padding: '1em',
                    margin: '1em',

                    backgroundColor: '#4d15b3',

                }}

                   >Outgoing Friend Requests</NavLink>
               </nav>

       {/*         <Routes>
                    <Route   path="/incoming-friend-requests" element={<IncomingFriendRequests/>}/>
                    <Route   path="/outgoing-friend-requests" element={<OutgoingFriendRequests/>}/>


                </Routes>*/}
            </div>
        </div>
    );
}

export default ViewFriendRequests;