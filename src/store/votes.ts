import {atom} from 'jotai';
import {Vote} from '../types';

export const votesAtom = atom<{
    list: Vote[],
    loading: boolean,
    userVote: Vote | null
}>({list: [], loading: true, userVote: null});
