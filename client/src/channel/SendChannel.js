import React from "react";
import Cookies from "universal-cookie";

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

    // Handle Sending to a channel

    // Handles Reading from a specific channel


    // onClick={handleSendGroup}
    return (
        <div>
            <h1>Send Channel Message</h1>

            <div>
                Channel Tag : <input value={channel} onChange={e => setChannel(e.target.value)}/>
            </div>
            <textarea value={cmessage} onChange={e => setCMessage(e.target.value)}/>
            <div>
                <button className="app-button" >Send Message</button> <button className="app-button" >Load Messages</button>
            </div>

            <div>{errorMessage}</div>


        </div>
    )
}

export default SendChannel;