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

