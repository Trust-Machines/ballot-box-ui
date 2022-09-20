import React, {ChangeEvent, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {runStrategy} from '@trustmachines/ballot-box-strategies';

import CloseModal from '../../components/close-modal';
import ThemedBox from '../../components/themed-box';
import {Muted} from '../../components/text';
import useAddress from '../../hooks/use-address';
import useModal from '../../hooks/use-modal';
import useToast from '../../hooks/use-toast';
import useTranslation from '../../hooks/use-translation';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import {vote} from '../../api/ballot-box';
import {NETWORK, ProposalWithSpace, SpaceBase, Space, USER_AUTH, VoteWithProposal} from '../../types';
import {NETWORKS} from '../../constants';
import {truncateMiddle} from '../../util';
import {formatVotePower} from '../../helper';

import {getCurrentBlock, getBlock} from '../../api/stacks';


const TestStrategy = (props: { strategy: string, network: NETWORK, strategyOptions: any }) => {
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const address = useAddress(props.network);
    const [userAddress, setUserAddress] = useState(address || '');
    const [height, setHeight] = useState(76471);
    const [maxHeight, setMaxHeight] = useState<number | null>(null);
    const [power, setPower] = useState<number | null>(null);

    const {strategy, network, strategyOptions,} = props;

    const space: Space = {
        id: 1,
        userId: 1,
        picture: null,
        proposalCount: 1,
        network,
        strategy,
        strategyOptions,
        name: '',
        about: null,
        websiteLink: null,
        termsLink: null,
        twitterHandle: null,
        githubHandle: null,
    }

    useEffect(() => {
        getCurrentBlock().then(r => {
            setHeight(r.height);
            setMaxHeight(r.height);
        }).finally(() => {
            setLoading(false);
        })
    }, []);


    const handleClose = () => {
        showModal(null);
    };

    const handleTest = async () => {
        setInProgress(true);
        setPower(null);
        let power: number | null = null;
        try {
            const block = await getBlock(height);

            power = await runStrategy(strategy, {
                network: NETWORKS[network],
                address: userAddress,
                blockTip: block.index_block_hash,
                blockHeight: block.height,
                options: strategyOptions
            });
        } catch (e) {

        } finally {
            setInProgress(false);
        }

        if (power !== null) {
            setPower(power)
        }
    }

    const addressChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setUserAddress(e.target.value);
    }

    const heightChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setHeight(parseInt(e.target.value));
    }

    return (
        <>
            <DialogTitle>{t('Test Strategy')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent sx={{padding: '20px'}}>
                <ThemedBox>
                    <Box sx={{mb: '20px'}}>
                        <TextField autoFocus label={t('Address')} value={userAddress} fullWidth
                                   onChange={addressChanged}
                                   inputProps={{
                                       maxLength: 100
                                   }}
                                   InputProps={{
                                       autoComplete: 'off',
                                       readOnly: inProgress || loading,
                                   }}
                        />
                    </Box>
                    <Box sx={{mb: '20px'}}>
                        <TextField autoFocus label={t('Block height')} value={height} fullWidth type="number"
                                   onChange={heightChanged}
                                   inputProps={{
                                       maxLength: 100,
                                       max: maxHeight || null
                                   }}
                                   InputProps={{
                                       autoComplete: 'off',
                                       readOnly: inProgress || loading,
                                   }}
                        />
                    </Box>
                    {power !== null && (
                        <Box sx={{mb: '20px'}}>
                            Voting power: {formatVotePower(power, space, 4)}
                        </Box>
                    )}
                </ThemedBox>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={inProgress || loading}>{t('Cancel')}</Button>
                <Button variant="contained" onClick={handleTest} disabled={inProgress || loading}>{t('Test')}</Button>
            </DialogActions>
        </>
    );
}

export default TestStrategy;
