import {atom} from 'jotai';
import {ProposalWithSpace, Proposal, Space, Vote} from '../types';

export {userSessionAtom, userDataAtom, userAuthAtom} from './auth';
export {themeAtom, toastAtom, modalAtom, appMenuVisibilityAtom} from './ui';
export {userIdAtom, userSpacesAtom} from './user-data';

export const bnsNameAtom = atom<{ address: string, name: string } | null>(null);
export const proposalsAtom = atom<Proposal[]>([]);
export const proposalAtom = atom<ProposalWithSpace | null>(null);
export const spaceAtom = atom<Space | null>(null);
export const votesAtom = atom<{
    list: Vote[],
    loading: boolean,
    userVote: Vote | null
}>({list: [], loading: true, userVote: null});
