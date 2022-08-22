import {alpha, Box, useTheme} from '@mui/material';

import ProposalVoteDialog from '../proposal-vote-dialog';
import {H3} from '../../../components/text';
import ThemedBox from '../../../components/themed-box';
import useTranslation from '../../../hooks/use-translation';
import useStyles from '../../../hooks/use-styles';
import useModal from '../../../hooks/use-modal';
import {ProposalWithSpace, VoteWithProposal} from '../../../types';


const ProposalVote = (props: { proposal: ProposalWithSpace, onVote: (proposal: VoteWithProposal) => void }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const theme = useTheme();
    const {linkHoverColor} = useStyles();
    const [, showModal] = useModal();

    const onVote = (vote: VoteWithProposal) => {
        props.onVote(vote);
    }

    return <Box sx={{mb: '40px'}}>
        <ThemedBox>
            <H3>{t('Cast your vote')}</H3>
            {proposal.choices.map((p, i) => <Box key={p} sx={{
                border: `1px solid ${theme.palette.divider}`,
                padding: '10px',
                borderRadius: '12px',
                textAlign: 'center',
                mb: i === proposal.choices.length - 1 ? null : '10px',
                fontWeight: '600',
                cursor: 'pointer',
                ':hover': {
                    color: linkHoverColor,
                    borderColor: alpha(theme.palette.divider, 0.6)
                }
            }} onClick={() => {
                showModal({
                    maxWidth: 'xs',
                    body: <ProposalVoteDialog proposal={proposal} choice={p} onVote={onVote}/>
                });
            }}>{p.toUpperCase()}</Box>)}
        </ThemedBox>
    </Box>
}

export default ProposalVote;
