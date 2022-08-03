import {atom} from 'jotai';

export const bnsNameAtom = atom<{ address: string, name: string } | null>(null);
