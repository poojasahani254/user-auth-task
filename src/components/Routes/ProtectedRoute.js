import React  from 'react';
import {Redirect, Route} from "react-router-dom";

function Protected({ component: Component, ...props }) {
    const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));

    return (
        <Route
            {...props}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    )
}

export default Protected;
