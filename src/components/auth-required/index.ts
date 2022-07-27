import React from 'react';
import useAuth2 from '../../hooks/use-auth';

const AuthRequired = (props: { children: React.ReactElement }) => {
    const {userData, openAuth, requestSignature} = useAuth2();

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
