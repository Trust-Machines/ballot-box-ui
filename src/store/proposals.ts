import {atom} from 'jotai';
import {Proposal} from '../types';

export const proposalsAtom = atom<Proposal[]>([]);
