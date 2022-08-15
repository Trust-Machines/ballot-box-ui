import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useParams} from '@reach/router';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';
import AppContent from '../../layout/app-content';
import Link from '../../components/link';
import ProposalView from '../components/proposal-view';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import useTranslation from '../../hooks/use-translation';
import {proposalAtom} from '../../store';
import {getProposal} from '../../api';
import ProposalInfo from '../components/proposal-info';


const SpacePage = (_: RouteComponentProps) => {
    const [proposal, setProposal] = useAtom(proposalAtom);
    const params = useParams();
    const [, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();

    useEffect(() => {
        getProposal(Number(params.proposalId)).then(r => {
            setProposal(r);
        });

        return () => {
            setProposal(null);
        }
    }, [params.proposalId]);

    return <>
        {proposal && <Helmet><title>{`${proposal.title} | BallotBox`}</title></Helmet>}
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                {(() => {
                    if (!proposal) {
                        return null;
                    }

                    return <Box sx={{
                        display: 'flex',
                        flexDirection: !isMd ? 'column' : 'row',
                        maxWidth: '100%'
                    }}>
                        <Box sx={{
                            flexGrow: 0,
                            flexShrink: 0,
                            width: isMd ? '610px' : null,
                            mr: isMd ? '10px' : null,
                            mb: !isMd ? '40px' : null
                        }}>
                            <Box sx={{mb: '20px'}}>
                                <Link to={`/spaces/${proposal.spaceId}`} sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                }}><ArrowBackIcon fontSize="small" sx={{mr: '4px'}}/> Back</Link>
                            </Box>
                            <ProposalView proposal={proposal}/>

                            {proposal.discussionLink && (
                                <></>
                            )}

                        </Box>
                        <Box sx={{
                            flexShrink: 0,
                            flexGrow: 1,
                        }}>
                            <ProposalInfo proposal={proposal}/>
                        </Box>
                    </Box>;
                })()}
            </AppContent>
        </AppWrapper>
    </>
}


export default SpacePage;
