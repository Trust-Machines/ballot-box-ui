export const percentOf = (partialValue: number, totalValue: number) => (100 * partialValue) / totalValue;

export const truncateMiddle = (s: string, cut: number): string => {
    const l = s.length;
    return s.substring(0, cut) + '...' + s.substring(l - cut, l);
}

export const truncate = (s: string, cut: number) => {
    if (s.length > cut) {
        return s.substring(0, cut) + '...';
    } else {
        return s;
    }
}

export const toUnixTs = (now: number) => Math.floor(now / 1000);

export const unixTsNow = () => Math.floor(Date.now() / 1000);


export const getHandleFromLink = (baseUrl: string, link: string) => {
    if (link.startsWith(baseUrl)) {
        const parts = link.split('/');
        const handle = parts[parts.length - 1];
        return handle.trim();
    }

    return null;
}
