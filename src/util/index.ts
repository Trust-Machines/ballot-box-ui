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

export const toUnixTs = (now: number) =>  Math.floor(now / 1000);
