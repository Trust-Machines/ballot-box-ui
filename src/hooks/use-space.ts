import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useLocation} from '@reach/router';

import {spaceAtom} from '../store';
import {Space} from '../types';

import {getSpace} from '../api';


const useSpace = (): { space: Space | null, updateSpace: (space: Space) => void } => {
    const [space, setSpace] = useAtom(spaceAtom);
    const location = useLocation();

    useEffect(() => {
        const spaceId = location.pathname.startsWith('/spaces/') ? Number(location.pathname.split('/')[2]) : null;

        if (!spaceId) {
            return;
        }
        setSpace(null);

        getSpace(spaceId).then(r => {
            setSpace(r);
        });

    }, [location, setSpace]);

    const updateSpace = (space: Space) => {
        setSpace(space);
    }

    return {space, updateSpace};
}

export default useSpace;
