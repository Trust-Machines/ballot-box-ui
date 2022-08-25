import {useAtom} from 'jotai';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import Link from '../../../components/link';
import ProposalView from '../../components/proposal-view';
import ProposalVote from '../../components/proposal-vote';
import ProposalVotes from '../../components/proposal-votes';
import ProposalInfo from '../../components/proposal-info';
import ProposalStats from '../../components/proposal-stats';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useToast from '../../../hooks/use-toast';
import useTranslation from '../../../hooks/use-translation';
import {proposalAtom, userSpacesAtom} from '../../../store';
import {ProposalWithSpace, VoteWithProposal} from '../../../types';

export const Proposal = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const [, isMd] = useMediaBreakPoint();
    const [, setProposal] = useAtom(proposalAtom);
    const [userSpaces] = useAtom(userSpacesAtom);
    const [, showMessage] = useToast();
    const editable = userSpaces.find(x => x.id === proposal.space.id) !== undefined && proposal.status === 'new';

    const onVote = (vote: VoteWithProposal) => {
        setProposal({
            ...proposal!,
            voteStats: vote.proposal.voteStats
        });
        showMessage(t('Your vote has been casted'), 'success');
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: !isMd ? 'column' : 'row',
        maxWidth: '100%'
    }}>
        <Box sx={{
            flexGrow: 0,
            flexShrink: 0,
            width: isMd ? '600px' : null,
            mr: isMd ? '20px' : null,
            mb: !isMd ? '40px' : null
        }}>
            <Box sx={{mb: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Link to={`/spaces/${proposal.spaceId}`} sx={{
                    display: 'inline-flex',
                    alignItems: 'center'
                }}><ArrowBackIcon fontSize="small" sx={{mr: '4px'}}/>{t('Back')}</Link>
                {editable && (
                    <Link to={`/spaces/${proposal.spaceId}/proposals/${proposal.id}/edit`} sx={{
                        display: 'inline-flex',
                        alignItems: 'center'
                    }}><EditIcon fontSize="small" sx={{mr: '4px'}}/>{t('Edit')}</Link>
                )}
            </Box>
            <ProposalView proposal={proposal}/>
            {proposal.status === 'on' && <ProposalVote proposal={proposal} onVote={onVote}/>}
            {proposal.status !== 'new' && <ProposalVotes proposal={proposal}/>}
        </Box>
        <Box sx={{
            flexShrink: 0,
            flexGrow: 1,
        }}>
            <ProposalInfo proposal={proposal}/>
            {proposal.status !== 'new' && <ProposalStats proposal={proposal}/>}
        </Box>
    </Box>;
}

export default Proposal;
