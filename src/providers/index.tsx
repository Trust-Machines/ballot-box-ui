import React from 'react'
import {Provider} from 'jotai';
import {ClientProvider} from '@micro-stacks/react';

import DevToolsProvider from './dev-tools';
import ThemeProvider from './theme';
import ModalProvider from './modal';
import ToastProvider from './toast';

import {baseAuthOptions} from '../constants';

const Providers: React.FC = ({children}) => {
    return (
        <Provider>
            <ClientProvider appName={baseAuthOptions.appDetails.name}
                            appIconUrl={baseAuthOptions.appDetails.icon}
                            onNoWalletFound={() => {
                                /*
                                showModal({
                                    body: <InstallWalletDialog/>
                                })
                                 */
                            }}>
                <DevToolsProvider>
                    <ThemeProvider>
                        <ModalProvider>
                            <ToastProvider>
                                {children}
                            </ToastProvider>
                        </ModalProvider>
                    </ThemeProvider>
                </DevToolsProvider>
            </ClientProvider>
        </Provider>
    )
}

export default Providers;
