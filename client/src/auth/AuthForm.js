import React from "react";
import {useNavigate} from "react-router";
import {auth, logout} from './AuthCheck';
import Cookies from 'universal-cookie';

const AuthForm = ({setIsLoggedIn}) =>  {
    const cookies = new Cookies();

    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [profilePicture, setProfilePicture] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();


    async function handleSubmit() {
        setIsLoading(true);
        setErrorMessage(''); // fresh error message each time
        const body = {
            userName: userName,
            password: password,
        };
        const httpSettings = {
            body: JSON.stringify(body),
            method: 'POST'
        };
        const result = await fetch('/createUser', httpSettings);
        const apiRes = await result.json();
        console.log(apiRes);
        if (apiRes.status) {
            // user was created
            // todo
        } else {
            // some error message
            setErrorMessage(apiRes.message);
        }
        setIsLoading(false);
    };

    async function handleLogIn() {
        setIsLoading(true);
        setErrorMessage(''); // fresh error message each time
        const body = {
            userName: userName,
            password: password,
            profilePicture: profilePicture,
        };
        const httpSettings = {
            body: JSON.stringify(body),
            method: 'POST'
        };
        const result = await fetch('/login', httpSettings);

        result.headers.forEach(function(value, name) {
            console.log(name + ": " + value);
        });


       // alert("hash header (how to get it??): " + result.headers.get('set-cookie') + " " + hash);

        if (result.status === 200) {
            // login worked
            await setIsLoggedIn(true);
            //getConversations();

            let hash = await result.text();
            auth(hash);

            navigate('/send-message-form', {replace: true});
            window.location.reload(false);
        } else {
            // login did not work
            setErrorMessage(`Username or password incorrect.`);
        }

        setIsLoading(false);
    };


    return (
        <div className="auth-form-wrapper">
            <h1>Authorization Form</h1>

            <input value={userName} onChange={e => setUserName(e.target.value)}
                   placeholder="Username"
            />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password"
                   placeholder = "Password"
            />

            <div className="auth-form-buttons-wrapper">
                <button onClick={handleSubmit} disabled={isLoading} className="app-button">Register</button>
                <button onClick={handleLogIn} disabled={isLoading} className="app-button">Log in</button>
            </div>

            <div>
                {isLoading ? 'Loading ...' : null}
            </div>

            <div className="error-message">{errorMessage}</div>


        </div>
    );
};

export  default  AuthForm;