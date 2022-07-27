import React from 'react';
import useAuth from '../../hooks/use-auth';

const AuthRequired = (props: { children: React.ReactElement }) => {
    const {userData, openAuth, requestSignature} = useAuth();

    if (!userData) {
        return React.cloneElement(props.children, {
            onClick: () => {
                requestSignature();
            }
        })
    }

    return props.children;
}

export default AuthRequired;
