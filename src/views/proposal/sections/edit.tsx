import {useEffect, useState} from 'react';
import moment from 'moment';
import {useAtom} from 'jotai';
import {useNavigate} from '@reach/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Link from '../../../components/link';
import ProposalForm from '../../components/proposal-form';
import DeleteProposal from '../../components/dialogs/proposal-delete';
import useTranslation from '../../../hooks/use-translation';
import useToast from '../../../hooks/use-toast';
import useModal from '../../../hooks/use-modal';
import {proposalsAtom} from '../../../store';
import {ProposalWithSpace} from '../../../types';


const ProposalEdit = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [, showMessage] = useToast();
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [proposals, setProposals] = useAtom(proposalsAtom);
    const [, showModal] = useModal()
    const proposalAddress = `/spaces/${proposal.spaceId}/proposals/${proposal.id}`;

    useEffect(() => {
        if (updated) {
            showMessage(t('Your proposal updated'), 'success');
            navigate(proposalAddress).then();
        }
    }, [updated]);

    useEffect(() => {
        if (deleted) {
            showMessage(t('Proposal deleted'), 'info');
            navigate(`/spaces/${proposal.space.id}`).then();
        }
    }, [deleted]);

    return <>
        <Box sx={{mb: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Link to={proposalAddress} sx={{
                display: 'inline-flex',
                alignItems: 'center'
            }}><ArrowBackIcon fontSize="small" sx={{mr: '4px'}}/>{t('Back')}</Link>
            <Button size="small" color="error" onClick={() => {
                showModal({
                    body: <DeleteProposal
                        proposal={proposal}
                        onSuccess={() => {
                            setProposals([...proposals.filter(x => x.id !== proposal.id)]);
                            setDeleted(true);
                        }}/>
                })
            }}>
                <DeleteForever fontSize="small" sx={{mr: '4px'}}/>{t('Delete proposal')}
            </Button>
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
                setUpdated(true);
            }}
        />
    </>;
}

export default ProposalEdit;
