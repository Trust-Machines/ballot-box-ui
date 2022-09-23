import {useAtom} from 'jotai';
import Box from '@mui/material/Box';
import green from '@mui/material/colors/green';
import CheckIcon from '@mui/icons-material/Check';
import {alpha, useTheme} from '@mui/material';

import ProposalVoteDialog from './proposal-vote-dialog';
import {H3} from '../../components/text';
import ThemedBox from '../../components/themed-box';
import useRequireAuth from '../../hooks/use-require-auth';
import useTranslation from '../../hooks/use-translation';
import useStyles from '../../hooks/use-styles';
import useModal from '../../hooks/use-modal';
import {authWindowStateAtom, votesAtom} from '../../store';
import {Proposal, VoteWithProposal} from '../../types';

const ProposalVote = (props: { proposal: Proposal, onVote: (proposal: VoteWithProposal) => void }) => {
    const {proposal} = props;
    const [votes] = useAtom(votesAtom);
    const [t] = useTranslation();
    const theme = useTheme();
    const {linkHoverColor} = useStyles();
    const [, showModal] = useModal();
    const requireAuthSignature = useRequireAuth();
    const [authWindowState] = useAtom(authWindowStateAtom);

    const onVote = (vote: VoteWithProposal) => {
        props.onVote(vote);
    }

    return <Box sx={{mb: '40px'}}>
        <ThemedBox>
            <H3>{t('Cast your vote')}</H3>
            {proposal.choices.map((p, i) => {
                const isUserVote = votes.userVote?.choice === p;
                return <Box key={p}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${theme.palette.divider}`,
                        padding: '10px',
                        borderRadius: '12px',
                        mb: i === proposal.choices.length - 1 ? null : '10px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        pointerEvents: authWindowState ? 'none' : null,
                        ':hover': {
                            color: linkHoverColor,
                            borderColor: alpha(theme.palette.divider, 0.6)
                        }
                    }} onClick={async () => {
                        const auth = await requireAuthSignature();

                        showModal({
                            maxWidth: 'xs',
                            body: <ProposalVoteDialog auth={auth} proposal={proposal} choice={p} onVote={onVote}/>
                        });
                    }}>
                        {isUserVote ? <CheckIcon sx={{
                            mr: '10px',
                            ml: '-30px',
                            fontSize: '18px',
                            color: green[400]
                        }}/> : null}{p.toUpperCase()}</Box>
                </Box>
            })}
        </ThemedBox>
    </Box>
}

export default ProposalVote;
