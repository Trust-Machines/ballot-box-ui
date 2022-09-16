import {AppConfig} from '@stacks/connect-react';
import {StacksMainnet, StacksTestnet, StacksNetwork} from '@stacks/network';
import {NETWORK} from './types';

export const API_BASE = process.env.REACT_APP_API_BASE;

export const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);

export const baseAuthOptions = {
    redirectTo: '/',
    manifestPath: '/manifest.json',
    appDetails: {
        name: 'Ballot Box',
        icon: `${window.origin}/logo512.png`,
    },
}


export const NETWORKS: Record<NETWORK, StacksNetwork> = {
    'mainnet': new StacksMainnet(),
    'testnet': new StacksTestnet()
}

export const SIGNATURE_MESSAGE = 'BallotBoxAuth';

export const IFRAMELY_API_KEY = process.env.REACT_APP_IFRAMELY_API_KEY;

export const EXPLORER_BASE = 'https://explorer.stacks.co';
