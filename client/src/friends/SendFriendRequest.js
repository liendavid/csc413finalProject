/* Search for a user, and send a friend request */

import React from "react";
import Cookies from "universal-cookie";

const SendFriendRequest = () =>  {
    const cookies = new Cookies();

    const [userName, setUserName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    async function sendFriendRequestAction()  {
        setIsLoading(true);

        let url = 'http://localhost:3000/sendFriendRequest';
        const body = {
            toUsername: userName,
        };
        const httpSettings = {
            body: JSON.stringify(body),
            method: 'POST',

            headers: {
                auth: cookies.get('auth'), // retrieve cookie from cookies
            }
        };

        const result = await fetch(url, httpSettings);
        const apiRes = await result.json();
        if (result.status === 200)  {
            // friend request was sent

            setIsError(false);
        } else  {
            setIsError(true);
        }
        let message = apiRes.message;
        setMessage(message);
        setIsLoading(false);

        if (apiRes.status)  {
            setIsError(false);
        } else  {
            setIsError(true);
        }
    }

    return (
      <div>
          <h1>Send Friend Request</h1>

          <div className="send-friend-request-form">

            <input value={userName} onChange = {e => setUserName(e.target.value)}
                type="text" placeholder="Username"/>

          <button onClick={sendFriendRequestAction} disabled={isLoading} className="app-button">Send Friend Request</button>

          <div   className={'send-request-message ' + (isError ? 'error' : 'success')}>
              {isLoading ? 'Loading ...' : message }
          </div>


          </div>
      </div>
    );
};

export default SendFriendRequest;