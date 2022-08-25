import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {useTheme} from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {green} from '@mui/material/colors';

import useAuth from '../../hooks/use-auth';
import useTranslation from '../../hooks/use-translation';
import {H3, Muted} from '../../components/text';
import ThemedBox from '../../components/themed-box';
import {votesAtom} from '../../store';
import {getProposalVotes} from '../../api/ballot-box';
import {formatVotePower} from '../../helper';
import {ProposalWithSpace} from '../../types';


const ProposalVotes = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const {symbol} = proposal.space.strategyOptions;
    const [t] = useTranslation();
    const [votes, setVotes] = useAtom(votesAtom);
    const {data} = useAuth();
    const theme = useTheme();
    const userAddress = (data && data.profile.stxAddress[proposal.space.network]) || null;
    const commonSx = {
        mr: '6px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };


    useEffect(() => {
        setVotes({...votes, loading: true, userVote: null});

        getProposalVotes(proposal.id, userAddress)
            .then(resp => {
                setVotes({
                    list: resp,
                    loading: false,
                    userVote: resp[0] && resp[0].userAddress === userAddress ? resp[0] : null
                });
            })
        return () => {
            setVotes({list: [], loading: true, userVote: null});
        }
    }, [proposal, userAddress]);

    return <>
        <Box sx={{display: 'flex', alignItems: 'center', mb: '10px'}}>
            <H3 sx={{mb: 0, mr: '6px'}}>{t('Votes')}</H3>
            {votes.list.length > 0 ? <Chip size="small" label={votes.list.length}/> : null}
        </Box>
        {(() => {
            if (votes.list.length === 0 && votes.loading) {
                return null;
            }

            if (votes.list.length === 0) {
                return <Muted>{t('No votes, yet.')}</Muted>
            }

            return <ThemedBox>
                {votes.list.map((vote, i) => {
                    const isLast = i === votes.list.length - 1;
                    const emphasise = votes.userVote?.id === vote.id;

                    return <Box key={vote.id} sx={{
                        pb: isLast ? null : '10px',
                        borderBottom: !isLast ? `1px solid ${theme.palette.divider}` : null,
                        mt: i === 0 ? null : '10px',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: emphasise ? 600 : null
                    }}>{emphasise ?
                        <Box sx={{
                            width: '12px',
                            height: '12px',
                            background: green[400],
                            borderRadius: '50%',
                            flexShrink: 0,
                            mr: '6px'
                        }}/> : null}
                        <Box sx={{
                            width: emphasise ? '102px' : '120px',
                            maxWidth: emphasise ? '242px' : '260px',
                            flexGrow: 1,
                            ...commonSx
                        }} title={vote.userAddress}>
                            {vote.userName || vote.userAddress}</Box>
                        <Box sx={{
                            width: '120px',
                            textAlign: 'center',
                            flexGrow: 1,
                            ...commonSx
                        }}>{vote.choice.toUpperCase()}</Box>
                        <Box sx={{
                            width: '100px',
                            textAlign: 'right',
                            ...commonSx
                        }}>{`${formatVotePower(vote.power)} ${symbol}`}</Box>
                    </Box>
                })}
            </ThemedBox>
        })()}
    </>


}

export default ProposalVotes;
