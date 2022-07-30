export type NETWORK = 'mainnet' | 'testnet';

export interface USER_AUTH {
    signature: string,
    publicKey: string
}

export interface ApiError {
    error: string
}

export interface Space {
    id: number,
    name: string,
    userId: number,
    about: string | null,
    websiteLink: string | null,
    termsLink: string | null,
    twitterHandle: string | null,
    githubHandle: string | null,
    picture: string | null,
}
