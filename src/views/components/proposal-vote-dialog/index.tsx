import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {runStrategy} from '@trustmachines/ballot-box-strategies';

import AuthRequired from '../../../components/auth-required';
import CloseModal from '../../../components/close-modal';
import ThemedBox from '../../../components/themed-box';
import {Muted} from '../../../components/text';
import useAddress from '../../../hooks/use-address';
import useModal from '../../../hooks/use-modal';
import useToast from '../../../hooks/use-toast';
import useAuth from '../../../hooks/use-auth';
import useTranslation from '../../../hooks/use-translation';
import {vote} from '../../../api';
import {ProposalWithSpace, VoteWithProposal} from '../../../types';
import {NETWORKS} from '../../../constants';


const ProposalVoteDialog = (props: { proposal: ProposalWithSpace, choice: string, onVote: (proposal: VoteWithProposal) => void }) => {
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const {auth} = useAuth();
    const [, showMessage] = useToast();
    const [votingPower, setVotingPower] = useState(0);
    const [loading, setLoading] = useState(true);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const {proposal, choice, onVote} = props;
    const {space} = proposal;
    const address = useAddress(space.network);

    useEffect(() => {
        if (!proposal.startBlockTip) {
            return;
        }

        runStrategy(space.strategy, NETWORKS[space.network], address!, proposal.startBlockTip, space.strategyOptions).then(r => {
            setVotingPower(r);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const handleClose = () => {
        showModal(null);
    };

    const handleConfirm = async () => {
        setInProgress(true);
        vote(auth!, proposal.id, choice).then((r) => {
            showModal(null);
            onVote(r);
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
        }).finally(() => {
            setInProgress(false);
        });
    }

    return (
        <>
            <DialogTitle>{t('Vote overview')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent sx={{padding: '20px'}}>
                <ThemedBox>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px',
                        fontWeight: '600',

                    }}>
                        <Muted>{t('Option')}</Muted>
                        <Box sx={{textAlign: 'right'}}>{choice.toUpperCase()}</Box>
                        <Muted>{t('Your Voting Power')}</Muted>
                        <Box sx={{textAlign: 'right'}}>{votingPower.toFixed(4)}</Box>
                    </Box>
                </ThemedBox>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <Button onClick={handleClose} disabled={inProgress}>{t('Cancel')}</Button>
                <AuthRequired>
                    <Button variant="contained" onClick={handleConfirm}
                            disabled={loading || inProgress || votingPower === 0}>{t('Vote')}</Button>
                </AuthRequired>
            </DialogActions>
        </>
    );
}

export default ProposalVoteDialog;
