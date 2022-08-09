import React from 'react';
import useAuth from '../../hooks/use-auth';

const AuthRequired = (props: { children: React.ReactElement, inactive?: boolean }) => {
    const {auth, data, openAuth, requestSignature} = useAuth();

    if (props.inactive) {
        return props.children;
    }

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
