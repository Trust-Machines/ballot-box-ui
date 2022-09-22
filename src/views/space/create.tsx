import React, {ChangeEvent, useState} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useNavigate} from '@reach/router';
import {Helmet} from 'react-helmet';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import strategies from '@trustmachines/ballot-box-strategies';
import {SelectChangeEvent} from '@mui/material/Select';

import AppMenu from '../../layout/app-menu';
import AppWrapper from '../../layout/app-wrapper';
import AppHeader from '../../layout/app-header';
import AppContent from '../../layout/app-content';
import {H2} from '../../components/text';
import StrategyOptionsForm from '../components/strategy-options-form';
import TestStrategy from '../components/test-strategy';
import useRequireAuth from '../../hooks/use-require-auth';
import useTranslation from '../../hooks/use-translation';
import useToast from '../../hooks/use-toast';
import useModal from '../../hooks/use-modal';
import {createSpace} from '../../api/ballot-box';
import {userSpacesAtom, authWindowStateAtom} from '../../store';
import {NETWORK} from '../../types';


const CreateSpace = (_: RouteComponentProps) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const requireAuthSignature = useRequireAuth();
    const [, showMessage] = useToast();
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [network, setNetwork] = useState<NETWORK>('mainnet');
    const [strategy, setStrategy] = useState<string>('empty');
    const [strategyOptions, setStrategyOptions] = useState<any>({});
    const [isStrategyListOpen, setIsStrategyListOpen] = useState(false);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [userSpaces, setUserSpaces] = useAtom(userSpacesAtom);
    const [authWindowState] = useAtom(authWindowStateAtom);

    let strategyOptionList = Object.keys(strategies).map(s => ({
        label: strategies[s].description,
        value: s
    }));

    if (!isStrategyListOpen) {
        strategyOptionList = [{
            label: 'Click to select',
            value: 'empty'
        }, ...strategyOptionList]
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleNetworkChange = (event: SelectChangeEvent) => {
        setNetwork(event.target.value as NETWORK);
    };

    const handleStrategyChange = (event: SelectChangeEvent) => {
        setStrategy(event.target.value as string);
        setStrategyOptions({});
    }

    const handleStrategyOpen = () => {
        setIsStrategyListOpen(true);
    }

    const handleStrategyClose = () => {
        setIsStrategyListOpen(false);
    }

    const isStrategyOptionsValid = () => {
        if (strategy !== 'empty') {
            if (Object.keys(strategies[strategy].schema).length > 0) {
                return Object.values(strategyOptions).find(x => x === '') === undefined;
            }
            return true;
        }

        return false;
    }

    const canSubmit = name && isStrategyOptionsValid();

    const test = () => {
        if (!isStrategyOptionsValid()) {
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
            body: <TestStrategy network={network} strategy={strategy} strategyOptions={options}/>
        });
    }

    const submit = async () => {
        if (!canSubmit) {
            showMessage(t('Please fill all fields in the form'), 'error');
            return;
        }

        const auth = await requireAuthSignature();

        setInProgress(true);
        createSpace(auth, name, network, strategy, strategyOptions).then(space => {
            setUserSpaces([...userSpaces, space]);
            showMessage(t('Your new space created'), 'success');
            navigate(`/spaces/${space.id}`).then();
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
        }).finally(() => {
            setInProgress(false);
        })
    }

    const showStrategyOptions = strategy !== 'empty' &&
        Object.keys(strategies[strategy].schema).filter(a => strategies[strategy].schema[a].type !== 'hardcoded').length > 0;
    const showTestButton = strategy !== 'empty';

    return <>
        <Helmet><title>BallotBox | Create a space</title></Helmet>
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <Box sx={{maxWidth: '600px'}}>
                    <H2>{t('Create space')}</H2>
                    <Box sx={{mb: '20px'}}>
                        <TextField autoFocus label={t('Space name')} value={name} fullWidth
                                   onChange={handleInputChange}
                                   inputProps={{
                                       maxLength: 30
                                   }}
                                   InputProps={{
                                       autoComplete: 'off',
                                       readOnly: inProgress,
                                   }}
                        />
                    </Box>
                    <FormControl sx={{mb: '20px'}} fullWidth>
                        <InputLabel id="network-select-label">{t('Network')}</InputLabel>
                        <Select
                            labelId="network-select-label"
                            id="network-select"
                            value={network}
                            label={t('Network')}
                            onChange={handleNetworkChange}
                            readOnly={inProgress}
                        >
                            <MenuItem value="mainnet">Mainnet</MenuItem>
                            <MenuItem value="testnet">Testnet</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{mb: '20px'}} fullWidth>
                        <InputLabel id="strategy-select-label">{t('Voting Strategy')}</InputLabel>
                        <Select
                            labelId="strategy-select-label"
                            id="strategy-select"
                            value={strategy}
                            label={t('Voting Strategy')}
                            onOpen={handleStrategyOpen}
                            onClose={handleStrategyClose}
                            onChange={handleStrategyChange}
                            readOnly={inProgress}
                        >
                            {strategyOptionList.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {showStrategyOptions && (<>
                        <Box sx={{fontSize: '20px', fontWeight: '600', mb: '20px'}}>{t('Strategy options')}</Box>
                        <StrategyOptionsForm strategy={strategy} readOnly={inProgress} values={{}} onChange={(values) => {
                            setStrategyOptions(values);
                        }}/>
                    </>)}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Button variant="contained" onClick={submit}
                                disabled={inProgress || authWindowState}>{t('Submit')}</Button>

                        {showTestButton && (<>
                            <Button variant="outlined" onClick={test} color="info"
                                    size="small">{t('Test Strategy')}</Button>
                        </>)}
                    </Box>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}

export default CreateSpace;
