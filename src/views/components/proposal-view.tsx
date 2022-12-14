import React from 'react';
import Box from '@mui/material/Box';

import ProposalBody from './proposal-body';
import ProposalDiscussion from './proposal-discussion';
import {H2, Muted} from '../../components/text';
import SpaceIcon from '../../components/space-icon';
import Link from '../../components/link';
import useStyles from '../../hooks/use-styles';
import useTranslation from '../../hooks/use-translation';
import {ProposalWithSpace} from '../../types';


const ProposalView = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const styles = useStyles();
    const [t] = useTranslation();

    return <Box sx={{wordWrap: 'break-word'}}>
        <H2>{proposal.title}</H2>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: '20px',
            height: '30px'
        }}>
            <Box sx={{
                display: 'inline-flex',
                bgcolor: styles.proposalColor(proposal),
                borderRadius: '12px',
                padding: '4px 8px',
                fontSize: '90%',
                mr: '12px',
                color: '#fff'
            }}>
                {proposal.status === 'new' && (
                    <>{t('Upcoming')}</>
                )}
                {proposal.status === 'on' && (
                    <>{t('Active')}</>
                )}
                {proposal.status === 'off' && (
                    <>{t('Closed')}</>
                )}
            </Box>
            {proposal.space.picture && (
                <SpaceIcon space={proposal.space} sx={{width: '22px', height: '22px', mr: '4px'}}/>)}
            <Link to={`/spaces/${proposal.spaceId}`} sx={{fontWeight: 600}}>
                <Muted>{proposal.space.name}</Muted>
            </Link>
        </Box>
        <ProposalBody proposal={proposal}/>
        <ProposalDiscussion proposal={proposal}/>
    </Box>
}

export default ProposalView;
