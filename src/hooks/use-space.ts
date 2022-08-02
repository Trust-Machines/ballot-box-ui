import {useAtom} from 'jotai';

import {spaceAtom} from '../store';
import {Space} from '../types';

import {getSpace} from '../api';

const useSpace = (): { space: Space | null, fetchSpace: (spaceId: number) => Promise<Space>, updateSpace: (space: Space) => void } => {
    const [space, setSpace] = useAtom(spaceAtom);

    const fetchSpace = (spaceId: number) => {
        return getSpace(spaceId).then(r => {
            setSpace(r);
            return r;
        });
    }

    const updateSpace = (space: Space) => {
        setSpace(space);
    }

    return {space, fetchSpace, updateSpace};
}

export default useSpace;
