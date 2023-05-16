
import React from "react";
import Cookies from "universal-cookie";
import {Route, Routes} from "react-router-dom";
import FriendList from "../friends/FriendList";
import SendFriendRequest from "../friends/SendFriendRequest";
import ViewFriendRequests from "../friends/ViewFriendRequests";
import AuthForm from "../auth/AuthForm";

const cookies = new Cookies();


const SendMessageForm = () =>  {
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');


    const [userName, setUserName] = React.useState('');

    // new state variables for chat box
    const [toId, setToId] = React.useState('');
    const [message, setMessage] = React.useState('');



    // new state variable for list of convos
    const [conversations, setConversations] = React.useState([]); // default empty array

    async function getConversations() {
        const httpSettings = {
            method: 'GET',
            headers: {
                auth: cookies.get('auth'), // utility to retrive cookie from cookies
            }
        };
        const result = await fetch('/getConversations', httpSettings);
        const apiRes = await result.json();
        console.log(apiRes);
        if (apiRes.status) {
            // worked
            setConversations(apiRes.data); // java side should return list of all convos for this user
        } else {
            setErrorMessage(apiRes.message);
        }
    }

    async function handleSendMessage() {
        setIsLoading(true);
        setErrorMessage(''); // fresh error message each time
        const body = {
            fromId: userName,
            toId: toId,
            message: message,
        };
        const httpSettings = {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                auth: cookies.get('auth'), // utility to retrive cookie from cookies
            }
        };
        const result = await fetch('/createMessage', httpSettings);
        const apiRes = await result.json();
        console.log(apiRes);
        if (apiRes.status) {
            // worked
            setMessage('');
            await getConversations();
        } else {
            setErrorMessage(apiRes.message);
        }
        setIsLoading(false);
    };


    return (
        <div>
            <h1>Welcome {userName}</h1>

            <div>
            To: <input value={toId} onChange={e => setToId(e.target.value)} />
            </div>
            <textarea value={message} onChange={e => setMessage(e.target.value)} />
            <div>
            <button className="app-button" onClick={handleSendMessage}>Send Message</button>
            </div>

            <div>{errorMessage}</div>

            <div>{conversations.map(conversation => <div>Convo: {conversation.conversationId}</div>)}</div>



        </div>
    )
};

export  default SendMessageForm;