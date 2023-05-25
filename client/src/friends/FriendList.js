/* View the list of current friends */

import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";

const FriendList = () => {
    const cookies = new Cookies();

    let [friendships, setFriendships] = useState([]);
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    async function getFriendships()  {
        const url = 'http://localhost:3000/getFriends';

        const httpSettings = {
            method: 'GET',

            headers: {
                auth: cookies.get('auth'), // retrieve cookie from cookies
            }
        };

        const result = await fetch(url, httpSettings);
        const apiRes = await result.json();

        if (result.status === 200)  {
            setIsError(false);
        } else  {
            setIsError(true);
        }

        let friendshipsResult = [];
        if (apiRes.status)  {
            setIsError(false);
            friendshipsResult = apiRes.data;
        } else  {
            setIsError(true);
        }

        if (isError)  {
            setMessage('Could not retrieve Friendships!');
        }

        for (let i = 0; i < friendshipsResult.length; i++)  {
            friendshipsResult[i].id = i;
        }

        setFriendships(friendshipsResult);
    }

    useEffect(  () => {
        getFriendships();
    }, []);

    return  (
        <div className="FriendList">
            <div className="content">
                <h1>Friend List</h1>

                <div className={isError ? 'error' : 'success'}>{message}</div>

                <table className="friend-requests-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Friend</th>
                    </tr>
                    </thead>

                    <tbody>

                    {friendships.map((friendship) => (
                        <tr className="content-row" key={friendship.id}>
                            <td>{friendship.id + 1}</td>
                            <td>{friendship.firstFriendUsername}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default FriendList;