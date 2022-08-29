import React from 'react';
import {useAtom} from 'jotai';
import useAuth from '../../hooks/use-auth';
import {authWindowStateAtom} from '../../store';

const AuthRequired = (props: { children: React.ReactElement, inactive?: boolean }) => {
    const {auth, data, openAuth, requestSignature} = useAuth();
    const [authWindowState] = useAtom(authWindowStateAtom);

    const props_ = authWindowState ? {
        disabled: true
    } : {}

    const children = React.cloneElement(props.children, {
        ...props_,
    });

    if (props.inactive) {
        return children;
    }

    if (!data) {
        return React.cloneElement(children, {
            onClick: () => {
                openAuth();
            }
        });
    }

    if (!auth) {
        return React.cloneElement(children, {
            onClick: () => {
                requestSignature();
            }
        });
    }

    return children;
}

export default AuthRequired;
