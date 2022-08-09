import {Strategy} from '@trustmachines/ballot-box-strategies/build/src/types';
export type NETWORK = 'mainnet' | 'testnet';

export interface USER_AUTH {
    signature: string,
    publicKey: string
}

export interface ApiError {
    error: string
}

export interface SpaceBase {
    name: string,
    about: string | null,
    websiteLink: string | null,
    termsLink: string | null,
    twitterHandle: string | null,
    githubHandle: string | null,
}

export interface Space extends SpaceBase{
    id: number,
    userId: number,
    picture: string | null,
    network: NETWORK,
    strategy: string,
    strategyOptions: any
}
