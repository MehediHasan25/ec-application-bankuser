import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';



const ProtectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        //cookie.getCookie("x-auth-token").value !== null && cookie.getCookie("username").value !== null
        sessionStorage.getItem("x-auth-token") !== null && sessionStorage.getItem("userType")!==null && 
        sessionStorage.getItem('userStatus')!==null   
        ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
)


export default ProtectRoute;