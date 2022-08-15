import {atom} from 'jotai';
import {ProposalWithSpace} from '../types';

export const proposalAtom = atom<ProposalWithSpace | null>(null);
