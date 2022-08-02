import React from 'react';
import useAuth from '../../hooks/use-auth';

const AuthRequired = (props: { children: React.ReactElement}) => {
    const {auth, data, openAuth, requestSignature} = useAuth();

    if (!data) {
        return React.cloneElement(props.children, {
            onClick: () => {
                openAuth();
            }
        });
    }

    if (!auth) {
        return React.cloneElement(props.children, {
            onClick: () => {
                requestSignature();
            }
        });
    }

    return props.children;
}

export default AuthRequired;
