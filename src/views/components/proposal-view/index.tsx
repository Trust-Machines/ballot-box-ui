import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';

import {H2, Muted} from '../../../components/text';
import SpaceIcon from '../../../components/space-icon';
import Link from '../../../components/link';
import useStyles from '../../../hooks/use-styles';
import useTranslation from '../../../hooks/use-translation';
import {ProposalWithSpace} from '../../../types';


const ProposalView = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const styles = useStyles();
    const [t] = useTranslation();
    const bodyRef = useRef<HTMLDivElement | null>(null);
    const [bodyHeight, setBodyHeight] = useState<number | null>(null);
    const longBody = bodyHeight && bodyHeight > 420;

    useEffect(() => {
        if (bodyHeight !== null) {
            return;
        }

        setBodyHeight(bodyRef.current?.clientHeight || 0);
    });

    return <>
        <H2 sx={{wordWrap: 'break-word'}}>{proposal.title}</H2>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: '20px'
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
            {proposal.space.picture &&
            <SpaceIcon space={proposal.space} sx={{width: '22px', height: '22px', mr: '4px'}}/>}
            <Link to={`/spaces/${proposal.spaceId}`} sx={{fontWeight: 600}}>
                <Muted>{proposal.space.name}</Muted>
            </Link>
        </Box>
        <Box sx={{
            fontSize: '18px',
            lineHeight: '28px',
            position: 'relative',
            height: longBody ? '420px' : null,
            overflow: longBody ? 'hidden' : null
        }} ref={bodyRef}>
            {longBody && <Box sx={{
                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(60,60,60,0) 100%)',
                position: 'absolute',
                left: '0',
                right: '0',
                bottom: '0',
                height: '120px'
            }}>d

            </Box>}
            {proposal.body?.split('\n').map((x, i) => <Box component="p" key={i}>{x}</Box>)}
        </Box>
    </>
}

export default ProposalView;
