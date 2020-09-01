import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/dashboard-page";
import useAuth0 from "./useAuth";
import useAuth from "./useAuth";
import cogoToast from "cogo-toast";

//si asta e ceva nou
//https://stackoverflow.com/questions/57689058/is-this-the-correct-way-to-protect-a-route-in-react-using-hooks
function PrivateRoute(props: any) {
    const { component: Component, appProps, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(pr) => {
                if (appProps.isAuthenticated) {
                    return <Component {...pr} {...appProps} />
                }
                else {
                    cogoToast.warn("This is route is protected, please log in to continue.")
                    return <Redirect to="/" />
                }
            }
            }
        />
    );

}
export default PrivateRoute;