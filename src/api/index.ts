import {NETWORK, USER_AUTH, Space} from '../types';

const API_BASE = process.env.REACT_APP_API_BASE;

class ApiError extends Error {
    apiMessage: string;

    constructor(message: string) {
        super(message);
        this.apiMessage = message;
    }
}

const makeApiHeaders = (auth: USER_AUTH, network: NETWORK) => {
    return {
        'Content-type': 'application/json; charset=UTF-8',
        'x-signature': auth.signature,
        'x-public-key': auth.publicKey,
        'x-network': network
    }
}

const handleApiResponse = (promise: Promise<Response>) => {
    return promise.then(r => r.json())
        .then(r => {
            if (r.error) {
                throw new ApiError(r.error);
            }

            return r;
        });
}

export const apiPost = <T>(auth: USER_AUTH, network: NETWORK, endpoint: string, body: {}): Promise<T> => {
    return handleApiResponse(fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: makeApiHeaders(auth, network)
    }));
}

export const apiGet = <T>(auth: USER_AUTH, network: NETWORK, endpoint: string): Promise<T> => {
    return handleApiResponse(fetch(`${API_BASE}/${endpoint}`, {
        method: 'GET',
        headers: makeApiHeaders(auth, network)
    }));
}

export const getUserSpaces = (auth: USER_AUTH, network: NETWORK): Promise<Space[]> => {
    return apiGet(auth, network, 'spaces');
}

export const createSpace = (auth: USER_AUTH, network: NETWORK, name: string): Promise<Space> => {
    return apiPost(auth, network, 'spaces', {
        name,
        about: '',
        websiteLink: '',
        termsLink: '',
        twitterHandle: '',
        githubHandle: ''
    });
}
