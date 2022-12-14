import React from 'react'
import {Provider} from 'jotai';
import {Connect} from '@stacks/connect-react';

import DevToolsProvider from './dev-tools';
import ThemeProvider from './theme';
import ModalProvider from './modal';
import ToastProvider from './toast';

import {baseAuthOptions} from '../constants';

const Providers: React.FC = ({children}) => {
    return (
        <Provider>
            <Connect authOptions={baseAuthOptions}>
                <DevToolsProvider>
                    <ThemeProvider>
                        <ModalProvider>
                            <ToastProvider>
                                {children}
                            </ToastProvider>
                        </ModalProvider>
                    </ThemeProvider>
                </DevToolsProvider>
            </Connect>
        </Provider>
    )
}

export default Providers;
