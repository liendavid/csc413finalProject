 import {Navigate} from "react-router";
import React, { Component } from "react";
 import { useEffect, useState } from "react";
 import { isAuth } from "../auth/AuthCheck";

function render(c) {
    return c;
}


const PrivateRoute = (Component) => {
   // const [hasSession, setHasSession] = useState(false);

    let hasSession = isAuth();

    if (hasSession)  {
        return render(Component);
    } else  {
        return <Navigate to="/auth-form" />;
    }
};

export default PrivateRoute;
