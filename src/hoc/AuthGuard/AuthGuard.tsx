import React from 'react';
import {Navigate} from 'react-router-dom';
import { isTokenValid, tokenGetter } from '../../helpers/token';

const AuthGuard: React.FC<React.PropsWithChildren<any>> = (props) => {
    const token = tokenGetter();

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }
    else {
        const isUserAuthenticated = isTokenValid(token);
        if (!isUserAuthenticated) {
            return <Navigate to="/login" replace={true} />;
        }
        return props.children;
    }
};

export default AuthGuard;