import Cookies from "universal-cookie";

export function isAuth()  {
    let result = localStorage.getItem("hash");
     return result !== undefined && result !== null && result !== "null";
}

export function auth(hash)  {
    localStorage.setItem("hash", hash);
}

export function logout()  {
    localStorage.setItem("hash", null);
}

export async function getLoggedInUsername()  {
    const cookies = new Cookies();

    if (isAuth())  {
        const httpSettings = {
            method: 'GET',
            headers: {
                // utility to retrieve cookie from cookies
                auth: cookies.get('auth'),
            },
        };

        // TODO: for some reason adds %0A after the hash - it's accounted for in the backend code
        const hash = localStorage.getItem("hash").trim();
        const result = await fetch('/getUsernameByHash' + '?' +
            new URLSearchParams( {"hash": hash }), httpSettings);


        const apiRes = await result.json();
        console.log(apiRes);
        if (apiRes.status) {
            if (apiRes.data.length > 0)  {
                let username = apiRes.data[0].uniqueId;
                return username;
            }
        } else  {
            return "";
        }
    }

    return "";
}
