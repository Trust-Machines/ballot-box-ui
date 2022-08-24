import React from 'react';
import {useAtomDevtools} from 'jotai/devtools';
import {userSessionAtom} from '../store';

const DevToolsProvider: React.FC = ({children}) => {
    useAtomDevtools(userSessionAtom, 'UserSession');
    return <>{children}</>;
}

export default DevToolsProvider;
