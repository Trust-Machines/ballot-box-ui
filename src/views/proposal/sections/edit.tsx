import {useEffect, useState} from 'react';
import moment from 'moment';
import {useAtom} from 'jotai';
import {useNavigate} from '@reach/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';

import Link from '../../../components/link';
import ProposalForm from '../../components/proposal-form';
import useTranslation from '../../../hooks/use-translation';
import useToast from '../../../hooks/use-toast';
import {proposalsAtom} from '../../../store';
import {ProposalWithSpace} from '../../../types';

const ProposalEdit = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [, showMessage] = useToast();
    const [done, setDone] = useState(false);
    const [proposals, setProposals] = useAtom(proposalsAtom);
    const proposalAddress = `/spaces/${proposal.spaceId}/proposals/${proposal.id}`;

    useEffect(() => {
        if (done) {
            showMessage(t('Your proposal updated'), 'success');
            navigate(proposalAddress).then();
        }
    }, [done]);

    return <>
        <Box sx={{mb: '20px'}}>
            <Link to={proposalAddress} sx={{
                display: 'inline-flex',
                alignItems: 'center'
            }}><ArrowBackIcon fontSize="small" sx={{mr: '4px'}}/>{t('Back')}</Link>
        </Box>
        <ProposalForm
            proposalId={proposal.id}
            space={proposal.space}
            formDefault={{
                title: proposal.title,
                body: proposal.body || '',
                discussionLink: proposal.discussionLink || '',
                choices: proposal.choices,
                startDate: moment.unix(proposal.startTime),
                endDate: moment.unix(proposal.endTime)
            }}
            onSuccess={(p) => {
                setProposals([...proposals.map(x => x.id === proposal.id ? p : x)]);
                setDone(true);
            }}
        />
    </>;
}

export default ProposalEdit;
