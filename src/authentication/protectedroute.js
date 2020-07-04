import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isGuestAuthenticated, isAdminAuthenticated , isCookAuthenticated  } from './auth'

export const AdminProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAdminAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

                }
            }}
        />
    );
}

export const GuestProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isGuestAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

                }
            }}
        />
    );
}

// export const CookProtectedRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 if (isCookAuthenticated()) {
//                     return <Component {...props} />
//                 } else {
//                     return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

//                 }
//             }}
//         />
//     );
// }


export const AdminAndCookSharedProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isCookAuthenticated() || isAdminAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: props.location, state: { from: props.location } }} />

                }
            }}
        />
    );
}