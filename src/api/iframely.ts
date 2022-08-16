import {IFRAMELY_API_KEY} from '../constants';

export interface IframelyLinkData {
    title: string,
    description?: string,
    thumbnail?: string
}

export const getLinkData = (url: string): Promise<IframelyLinkData | null> => {
    if (!IFRAMELY_API_KEY) {
        return new Promise((resolve, reject) => {
            reject(null);
        });
    }

    return fetch(`https://iframe.ly/api/oembed?url=${url}&api_key=${IFRAMELY_API_KEY}`)
        .then(r => r.json())
        .then(r => {
            if (r.title) {
                return {
                    title: r.title,
                    description: r.description,
                    thumbnail: r.thumbnail_url
                }
            }

            return null;
        });
}
