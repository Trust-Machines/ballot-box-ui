import {NETWORK, USER_AUTH, Space} from '../types';

const API_BASE = process.env.REACT_APP_API_BASE;

class ApiError extends Error {
    apiMessage: string;

    constructor(message: string) {
        super(message);
        this.apiMessage = message;
    }
}

const makeApiHeaders = (auth: USER_AUTH) => {
    return {
        'Content-type': 'application/json; charset=UTF-8',
        'x-signature': auth.signature,
        'x-public-key': auth.publicKey
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
        headers: makeApiHeaders(auth)
    }));
}

export const apiGet = <T>(auth: USER_AUTH, endpoint: string): Promise<T> => {
    return handleApiResponse(fetch(`${API_BASE}/${endpoint}`, {
        method: 'GET',
        headers: makeApiHeaders(auth)
    }));
}

export const getMe = (auth: USER_AUTH): Promise<{ id: number }> => {
    return apiGet(auth, 'me');
}

export const getUserSpaces = async (userId: number): Promise<Space[]> => {
    return handleApiResponse(fetch(`${API_BASE}/spaces?userId=${userId}`, {
        method: 'GET',
    }));
}

export const getSpace = async (spaceId: number): Promise<Space> => {
    return handleApiResponse(fetch(`${API_BASE}/spaces/${spaceId}`, {
        method: 'GET',
    }));
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
