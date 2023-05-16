/* View incoming and outcoming friend requests */

import {NavLink, Route, Routes} from "react-router-dom";
import OutgoingFriendRequests from "./OutgoingFriendRequests";
import IncomingFriendRequests from "./IncomingFriendRequests";


import SendFriendRequest from "./SendFriendRequest";
import AuthForm from "../auth/AuthForm";
import SendMessageForm from "../messages/SendMessageForm";
import React, {useState} from "react";

const ViewFriendRequests = () => {
    const [showIncoming, setShowIncoming] = useState(true);
    const [showOutgoing, setShowOutgoing] = useState(false);
    const [showRequests, setShowRequests] = useState(true);

    return  (
        <div className="ViewFriendRequests">
            <h1>View Friend Requests</h1>

            <div className="view-requests-button-tabs">

                   <div className="app-button" onClick={() => {
                       setShowIncoming(true);
                       setShowOutgoing(false);
                       setShowRequests(true);
                   }}
                       style={{
                       textDecoration: 'none',
                       color: 'white',
                       fontWeight: 'bold',

                       padding: '1em',
                       margin: '1em',

                       backgroundColor: showIncoming ? 'green' : '#4d15b3',


                   }}>Incoming Friend Requests</div>
                   <div className="app-button" onClick={() => {
                       setShowIncoming(false);
                       setShowOutgoing(true);
                       setShowRequests(true);
                   }}

                           style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'bold',

                    padding: '1em',
                    margin: '1em',

                    backgroundColor: showOutgoing ? 'green' : '#4d15b3',

                }}

                   >Outgoing Friend Requests</div>
            </div>

            {showRequests && showIncoming ? <IncomingFriendRequests/> : ""}
            {showRequests && showOutgoing ? <OutgoingFriendRequests/> : ""}

        </div>
    );
}

export default ViewFriendRequests;