/* View incoming friend requests */

import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import {getLoggedInUsername} from "../auth/AuthCheck";

const IncomingFriendRequests = () =>  {
    const cookies = new Cookies();

    let [friendRequests, setFriendRequests] = useState();
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    async function acceptFriendRequest(request)  {
        if (request.isLoading)  {
            return;
        }

        request.isLoading = true;

        let fromUsername = request.fromUsername;

        const url = 'http://localhost:3000/acceptFriendRequest';
        const body = {
            fromUsername: fromUsername,
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
            // friend request was accepted
            setIsError(false);
        } else  {
            // request resulted in an error
            setIsError(true);
        }

        let message = apiRes.message;
        setMessage(message);

        if (apiRes.status)  {
            setIsError(false);

            request.isAccepted = true;
        } else  {
            setIsError(true);
        }

        request.isLoading = false;
        window.location.reload(false);

    }

    async function denyFriendRequest(request)  {
        const url = 'http://localhost:3000/denyFriendRequest';

        let fromUsername = request.fromUsername;

        const body = {
            fromUsername: fromUsername,
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
            // friend request was denied
            setIsError(false);
        } else  {
            // request resulted in an error
            setIsError(true);
        }

        let message = apiRes.message;
        setMessage(message);

        if (apiRes.status)  {
            setIsError(false);

            request.isDenied = true;
        } else  {
            setIsError(true);
        }

        request.isLoading = false;
        window.location.reload(false);

    }

    async function getIncomingFriendRequests()  {
      //  alert("getting");


        const httpSettings = {
            method: 'GET',
            headers: {
                // utility to retrieve cookie from cookies
                auth: cookies.get('auth'),
            }
        };
        const result = await fetch('/getIncomingFriendRequests', httpSettings);
    //    alert("sent");

      //  alert(JSON.stringify(result));
        const apiRes = await result.json();
        console.log(apiRes);
        if (apiRes.status) {
            let friends = [];

            for (let i = 0; i < apiRes.data.length; i++)  {
                let request = apiRes.data[i];
                request.id = i;
                friends.push(request);
            }

            setFriendRequests(friends);
        }

        return result;
    }

    let  [username, setUsername] = useState();
    useEffect(() => {
        getIncomingFriendRequests();

    }, []);


    return (
      <div className="incoming-wrapper">
          <h1>Incoming Friend Requests</h1>

          <div className={isError ? 'error' : 'success'}>{message}</div>

          {friendRequests !== undefined ?
              <table className="friend-requests-table">
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Status</th>
                  </tr>
                  </thead>

                  <tbody>
                  {friendRequests.map((request) => (
                      <tr className="content-row" key={request.id}>
                          <td>{request.id + 1}</td>
                          <td>{request.fromUsername}</td>
                          <td className={"status-cell " + (request.isAccepted ? 'green' :
                              request.isDenied ? 'red' : 'yellow')}>{request.isAccepted ? "Accepted" : request.isDenied ? "Denied" : "Pending"}</td>

                          <td className= "no-border  ">
                              <div onClick={() => {acceptFriendRequest(request)}}
                                  className={"app-button accept-button " +
                              (request.isAccepted ? 'accepted' : 'not-accepted')} >{request.isAccepted ? 'Accepted' : 'Accept'}</div>
                          </td>
                          <td className="no-border  ">
                              <div onClick={ () =>  {denyFriendRequest(request)} }
                                  className={"app-button deny-button " +
                              (request.isDenied ? 'denied' : 'not-denied')}>{request.isDenied ? 'Denied' : 'Deny'}</div>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          : ""}
      </div>
    );
};

export default IncomingFriendRequests;