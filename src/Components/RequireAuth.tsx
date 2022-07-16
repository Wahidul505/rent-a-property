import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

type Props = {
    children: any;
}

const RequireAuth: FC<Props> = ({ children }) => {
    const { user } = useAppSelector(state => state.userReducer);
    const email = user?.email;
    console.log('email', email);
    const location = useLocation();
    if (email) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
};

export default RequireAuth;