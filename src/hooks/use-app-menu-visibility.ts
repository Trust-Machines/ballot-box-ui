import {useAtom} from 'jotai';
import {appMenuVisibilityAtom} from '../store';

const useAppMenuVisibility = (): [boolean, () => void] => {
    const [appMenuVisibility, setAppMenuVisibilityAtom] = useAtom(appMenuVisibilityAtom);

    const toggleAppMenuVisibility = () => {
        setAppMenuVisibilityAtom(!appMenuVisibility);
    }

    return [appMenuVisibility, toggleAppMenuVisibility];
}

export default useAppMenuVisibility;
