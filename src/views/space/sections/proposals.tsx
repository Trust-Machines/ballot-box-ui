import {useEffect, useState} from 'react';
import {useAtom} from 'jotai';

import {Space} from '../../../types';
import {Muted} from '../../../components/text';
import ProposalCard from '../../components/proposal-card';
import useTranslation from '../../../hooks/use-translation';
import {getSpaceProposals} from '../../../api';
import {proposalsAtom} from '../../../store';


const Proposals = (props: { space: Space }) => {
    const {space} = props;
    const [t] = useTranslation();
    const [proposals, setProposals] = useAtom(proposalsAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSpaceProposals(space.id).then(r => {
            setProposals(r);
        }).finally(() => {
            setLoading(false);
        });
    }, [space.id]);

    if (loading) {
        return <>Loading...</>;
    }

    if (proposals.length === 0) {
        return <>
            <Muted sx={{textAlign: 'center', mt: '100px'}}>{t('There\'s nothing here, yet.')}</Muted>
        </>;
    }

    return <>
        {proposals.map(p => <ProposalCard key={p.id} proposal={p}/>)}
    </>

}

export default Proposals;
