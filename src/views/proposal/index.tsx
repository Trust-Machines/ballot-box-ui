import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useParams} from '@reach/router';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';
import AppContent from '../../layout/app-content';
import {H2} from '../../components/text';
import {proposalAtom} from '../../store';
import {getProposal, getSpace} from '../../api';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import Link from '../../components/link';


const SpacePage = (_: RouteComponentProps) => {
    const [proposal, setProposal] = useAtom(proposalAtom);
    const params = useParams();
    const theme = useTheme();
    const [, isMd] = useMediaBreakPoint()

    useEffect(() => {
        if (proposal?.id === Number(params.proposalId)) {
            return;
        }

        getProposal(Number(params.proposalId)).then(r => {

            setProposal(r);
            return r;
        });
    }, [params.proposalId]);

    if (!proposal) {
        return null;
    }

    return <>
        {proposal && <Helmet><title>{`${proposal.title} | BallotBox`}</title></Helmet>}
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: !isMd ? 'column' : 'row'
                }}>
                    <Box sx={{
                        flexGrow: 0,
                        flexShrink: 0,
                        background: 'red',
                    }}>
                        <Box sx={{mb: '20px'}}>
                            <Link to={`/spaces/${proposal.spaceId}`} sx={{
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}><ArrowBackIcon fontSize="small" sx={{mr: '4px'}}/> Back</Link>
                        </Box>
                        <H2 sx={{wordWrap: 'break-word'}}>{proposal.title}</H2>
                    </Box>
                    <Box sx={{
                        width: isMd ? '240px' : null,
                        flexShrink: 0,
                        flexGrow: 0,
                    }}>d

                    </Box>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}


export default SpacePage;
