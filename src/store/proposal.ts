import {atom} from 'jotai';
import {Proposal} from '../types';

export const proposalAtom = atom<Proposal | null>(null);
