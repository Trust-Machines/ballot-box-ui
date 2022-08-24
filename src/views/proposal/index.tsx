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
import ProposalVote from '../components/proposal-vote';
import ProposalStats from '../components/proposal-stats';
import ProposalVotes from '../components/proposal-votes';
import {VoteWithProposal} from '../../types';
import useToast from '../../hooks/use-toast';


const ProposalPage = (_: RouteComponentProps) => {
    const [proposal, setProposal] = useAtom(proposalAtom);
    const params = useParams();
    const [, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const [, showMessage] = useToast();

    useEffect(() => {
        getProposal(Number(params.proposalId)).then(r => {
            setProposal(r);
        })

        return () => {
            setProposal(null);
        }
    }, [params.proposalId]);

    const onVote = (vote: VoteWithProposal) => {
        setProposal({
            ...proposal!,
            voteStats: vote.proposal.voteStats
        });
        showMessage(t('Your vote has been casted'), 'success');
    }

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
                            width: isMd ? '600px' : null,
                            mr: isMd ? '20px' : null,
                            mb: !isMd ? '40px' : null
                        }}>
                            <Box sx={{mb: '20px'}}>
                                <Link to={`/spaces/${proposal.spaceId}`} sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                }}><ArrowBackIcon fontSize="small" sx={{mr: '4px'}}/> Back</Link>
                            </Box>
                            <ProposalView proposal={proposal}/>
                            {proposal.status === 'on' && <ProposalVote proposal={proposal} onVote={onVote}/>}
                            {proposal.voteCount > 0 && <ProposalVotes proposal={proposal}/>}
                        </Box>
                        <Box sx={{
                            flexShrink: 0,
                            flexGrow: 1,
                        }}>
                            <ProposalInfo proposal={proposal}/>
                            {proposal.status !== 'new' && <ProposalStats proposal={proposal}/>}
                        </Box>
                    </Box>;
                })()}
            </AppContent>
        </AppWrapper>
    </>
}


export default ProposalPage;
