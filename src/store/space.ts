import {atom} from 'jotai';
import {Space} from '../types';

export const spaceAtom = atom<Space | null>(null);
