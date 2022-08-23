import moment from 'moment';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import green from '@mui/material/colors/green';
import {useTheme, alpha} from '@mui/material';
import {H3, Muted} from '../../../../components/text'
import Link from '../../../../components/link';
import useTranslation from '../../../../hooks/use-translation';
import useStyles from '../../../../hooks/use-styles';
import {Proposal} from '../../../../types';
import {truncate} from '../../../../util';

const ProposalCard = (props: { proposal: Proposal }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const styles = useStyles();
    const theme = useTheme();

    return <Box component={Link} to={`/spaces/${proposal.spaceId}/proposals/${proposal.id}`} sx={{
        display: 'block',
        border: `1px solid ${theme.palette.divider}`,
        padding: '18px',
        borderRadius: '8px',
        mb: '20px',
        ':hover': {
            borderColor: alpha(theme.palette.divider, 0.6)
        }
    }}>
        <H3 sx={{wordWrap: 'break-word'}}>{proposal.title}</H3>
        {proposal.body && (<Muted sx={{
            mb: '20px',
            wordWrap: 'break-word'
        }}>{proposal.body ? truncate(proposal.body, 220) : ''}</Muted>)}
        {(() => {
            if (proposal.status === 'off') {
                const selected = proposal.voteStats.sort((a, b) => b.power - a.power)[0];
                if (selected.power !== 0) {
                    return <Box sx={{mb: '20px', display: 'flex', alignItems: 'center'}}>
                        <CheckIcon sx={{
                            fontSize: '18px',
                            color: green[400],
                            mr: '6px'
                        }}/><strong>{selected.choice}</strong>
                    </Box>
                }
            }
            return null;
        })()}
        <Muted sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{
                display: 'inline-flex',
                bgcolor: styles.proposalColor(proposal),
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                mr: '8px'
            }}/>
            {proposal.status === 'new' && (
                <>{' '}{t('Starts in {{t}}', {t: moment.unix(proposal.startTime).fromNow(true)})}</>
            )}
            {proposal.status === 'on' && (
                <>{' '}{t('Active, {{t}} left', {t: moment.unix(proposal.endTime).fromNow(true)})}</>
            )}
            {proposal.status === 'off' && (
                <>{' '}{t('Closed, {{v}} votes', {v: proposal.voteCount})}</>
            )}
        </Muted>
    </Box>
}

export default ProposalCard;
