import {Space} from '../../../../types';
import {Muted} from '../../../../components/text';
import useTranslation from '../../../../hooks/use-translation';

const Proposals = (props: { space: Space }) => {
    const [t] = useTranslation();
    return <>
        <Muted sx={{textAlign: 'center', mt: '100px'}}>{t('There\'s nothing here, yet.')}</Muted>
    </>;
}

export default Proposals;
