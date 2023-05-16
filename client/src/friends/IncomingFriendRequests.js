/* View incoming friend requests */

import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import {getLoggedInUsername} from "../auth/AuthCheck";

const IncomingFriendRequests = () =>  {
    const cookies = new Cookies();

    let [friendRequests, setFriendRequests] = useState();

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
                              <div className={"app-button accept-button " +
                              (request.isAccepted ? 'accepted' : 'not-accepted')} >Accept</div>
                          </td>
                          <td className="no-border  ">
                              <div className={"app-button deny-button " +
                              (request.isDenied ? 'denied' : 'not-denied')}>Deny</div>
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