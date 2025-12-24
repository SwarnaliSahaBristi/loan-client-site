import React from 'react';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';

const ManagerRoute = ({children}) => {
    const {role, isRoleLoading} = useRole();

    if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
    if(role==='manager') return children

    return <Navigate to='/' replace='true' />
};

export default ManagerRoute;