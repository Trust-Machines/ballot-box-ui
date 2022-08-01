import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useLocation} from '@reach/router';

import {spaceAtom} from '../store';
import {Space} from '../types';

import {getSpace} from '../api';


const useSpace = (): { space: Space | null } => {
    const [space, setSpace] = useAtom(spaceAtom);
    const location = useLocation();

    useEffect(() => {
        const spaceId = Number(location.pathname.replace('/spaces/', ''));
        if (!spaceId) {
            return;
        }
        setSpace(null);

        getSpace(spaceId).then(r => {
            setSpace(r);
        });

    }, [location, setSpace]);

    return {space};
}

export default useSpace;
