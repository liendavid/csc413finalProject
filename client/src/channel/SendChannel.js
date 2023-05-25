import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Form to send a message to the a channel chat
const SendChannel = () =>{
    // Get user values from react state
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [userName, setUserName] = React.useState('');

    // Get Channel specific values from react state
    const [channel, setChannel] = React.useState('');
    const [cmessage, setCMessage] = React.useState('');

    // Create channel convo array
    const [channelConvos, setChannelConvos] = React.useState([]);

    // Handles Reading from a specific channel
    async function getChannel(){
        // Build general request
        const httpSettings = {
            body: JSON.stringify({channelId: channel}),
            method: 'POST',
            headers: {
                auth: cookies.get('auth'),
            }
        };

        const result = await fetch('/getChannelMessages', httpSettings);
        const apiRes = await result.json();
        console.log(apiRes);
        if (apiRes.status) {
            // worked
            setChannelConvos(apiRes.data); // java side should return list of all convos for this user
        } else {
            setErrorMessage(apiRes.message);
        }
    }


    // Handle Sending to a channel
    async function handleSendChannel() {
        setIsLoading(true);
        setErrorMessage("");
        // Save data to json
        const body = {
            fromId: userName,
            channelId: channel,
            message: cmessage
        };
        // build request
        const httpSettings = {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                auth: cookies.get('auth'), // utility to retrive cookie from cookies
            }
        };
        // Send request
        const result = await fetch('/sendChannelMessage', httpSettings);
        const apiRes = await result.json();
        console.log(apiRes);
        // Success
        if (apiRes.status) {
            setCMessage("");
            await getChannel(); // Load messages from channel
        } else { // Error
            setErrorMessage(apiRes.message);
        }
        setIsLoading(false);
    }


    // onClick={handleSendGroup}
    return (
        <div>
            <h1>Send Channel Message</h1>

            <div>
                Channel Tag : <input value={channel} onChange={e => setChannel(e.target.value)}/>
            </div>
            <textarea value={cmessage} onChange={e => setCMessage(e.target.value)}/>
            <div>
                <button className="app-button" onClick={handleSendChannel}>Send Message</button> <button className="app-button" onClick={getChannel}>Load Messages</button>
            </div>

            <div>{errorMessage}</div>
            
            <div>{channelConvos.map(convo => <div>{convo.fromId} : {convo.message}</div>)}</div>

        </div>
    )
}

export default SendChannel;