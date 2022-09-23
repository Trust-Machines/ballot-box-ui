import React, {ChangeEvent, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import strategies, {runStrategy} from '@trustmachines/ballot-box-strategies';
import {validateStacksAddress} from '@stacks/transactions';

import CloseModal from '../../components/close-modal';
import ThemedBox from '../../components/themed-box';
import useAddress from '../../hooks/use-address';
import useModal from '../../hooks/use-modal';
import useTranslation from '../../hooks/use-translation';
import useToast from '../../hooks/use-toast';
import {formatVotePower} from '../../helper';
import {getCurrentBlock, getBlock} from '../../api/stacks';
import {NETWORK} from '../../types';
import {NETWORKS} from '../../constants';

interface Props {
    strategy: string,
    network: NETWORK,
    strategyOptions: any
}

const TestStrategyDialog = (props: Props) => {
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const [, showMessage] = useToast();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const address = useAddress(props.network);
    const [userAddress, setUserAddress] = useState(address || '');
    const [height, setHeight] = useState(76471);
    const [maxHeight, setMaxHeight] = useState<number | null>(null);
    const [power, setPower] = useState<number | null>(null);

    const {strategy, network, strategyOptions} = props;

    useEffect(() => {
        getCurrentBlock(network).then(r => {
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
        if (isNaN(height)) {
            showMessage(t('Invalid block height!'), 'error');
            return;
        }

        if (!validateStacksAddress(userAddress)) {
            showMessage(t('Invalid address!'), 'error');
            return;
        }

        setInProgress(true);
        setPower(null);
        let power: number | null = null;
        try {
            const block = await getBlock(network, height);

            power = await runStrategy(strategy, {
                network: NETWORKS[network],
                address: userAddress,
                blockTip: block.index_block_hash,
                blockHeight: block.height,
                options: strategyOptions
            });
        } catch (e) {
            showMessage(t("Couldn't get voting power"), 'error');
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
                    <Box sx={{height: '30px'}}>
                        {power !== null && (
                            <> Voting power: {formatVotePower({
                                power,
                                strategy,
                                strategyOptions,
                                fractionDigits: 4
                            })}</>
                        )}
                    </Box>
                </ThemedBox>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={inProgress || loading}>{t('Cancel')}</Button>
                <Button variant="contained" onClick={handleTest} disabled={inProgress || loading}>{t('Test')}</Button>
            </DialogActions>
        </>
    );
}

export const TestStrategyBtn = (props: Props) => {
    const [t] = useTranslation();
    const {strategy, strategyOptions} = props;
    const [, showModal] = useModal();
    const [, showMessage] = useToast();

    const test = () => {
        const strategyOptionsValid = Object.keys(strategies[strategy].schema).filter(x => strategies[strategy].schema[x].type !== 'hardcoded').find(x => !strategyOptions[x]) === undefined;

        if (!strategyOptionsValid) {
            showMessage(t('Please fill all strategy options'), 'error');
            return;
        }

        // Append hardcoded values to options
        const options = {...strategyOptions};
        for (let k of Object.keys(strategies[strategy].schema)) {
            const item = strategies[strategy].schema[k];
            if (item.type === 'hardcoded') {
                options[k] = item.value;
            }
        }

        showModal({
            body: <TestStrategyDialog {...props} strategyOptions={options}/>
        });
    }

    if (strategy === 'empty') {
        return null;
    }

    return <Button variant="outlined" onClick={test} color="info" size="small">{t('Test Strategy')}</Button>
}

export default TestStrategyBtn;
