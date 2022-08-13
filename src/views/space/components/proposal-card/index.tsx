import {Box, useTheme} from '@mui/material';

import {H3, Muted} from '../../../../components/text'
import {Proposal} from '../../../../types';


const ProposalCard = (props: { proposal: Proposal }) => {
    const {proposal} = props;
    const theme = useTheme();

    return <Box sx={{
        border: `1px solid ${theme.palette.divider}`,
        padding: '18px',
        borderRadius: '8px',
        mb: '20px',
        '&:hover': {}
    }}>
        <H3>{proposal.title}</H3>
        <Muted sx={{
            mb: '20px'
        }}>{proposal.body}</Muted>
    </Box>
}

export default ProposalCard;
