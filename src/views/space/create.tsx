import React, {useState, useRef} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useNavigate} from '@reach/router';
import {Helmet} from 'react-helmet';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import AppMenu from '../../layout/app-menu';
import AppWrapper from '../../layout/app-wrapper';
import AppHeader from '../../layout/app-header';
import AppContent from '../../layout/app-content';
import {H2} from '../../components/text';
import StrategyOptionsForm from '../components/strategy-options-form';
import TestStrategyBtn from '../components/test-strategy-btn';
import StrategySelect from '../components/strategy-select';
import NetworkSelect from '../components/network-select';
import useRequireAuth from '../../hooks/use-require-auth';
import useTranslation from '../../hooks/use-translation';
import useToast from '../../hooks/use-toast';
import {createSpace} from '../../api/ballot-box';
import {userSpacesAtom, authWindowStateAtom} from '../../store';
import {NETWORK, StrategyOptionsRecord} from '../../types';

const CreateSpace = (_: RouteComponentProps) => {
    const [t] = useTranslation();
    const requireAuthSignature = useRequireAuth();
    const [, showMessage] = useToast();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>();
    const [name, setName] = useState<string>('');
    const [network, setNetwork] = useState<NETWORK>('mainnet');
    const [strategy, setStrategy] = useState<string>('empty');
    const [strategyOptions, setStrategyOptions] = useState<StrategyOptionsRecord>({} as StrategyOptionsRecord);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [userSpaces, setUserSpaces] = useAtom(userSpacesAtom);
    const [authWindowState] = useAtom(authWindowStateAtom);

    const submit = async () => {
        if (name.trim() === '') {
            inputRef.current!.focus();
            return;
        }

        const auth = await requireAuthSignature();

        setInProgress(true);
        createSpace(auth, name, network, strategy, strategyOptions).then(space => {
            setUserSpaces([...userSpaces, space]);
            showMessage(t('Your new community created'), 'success');
            navigate(`/spaces/${space.id}`).then();
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
        }).finally(() => {
            setInProgress(false);
        })
    }

    return <>
        <Helmet><title>BallotBox | Create a space</title></Helmet>
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <Box sx={{maxWidth: '600px'}}>
                    <H2>{t('Create community')}</H2>
                    <Box sx={{mb: '20px'}}>
                        <TextField autoFocus inputRef={inputRef} label={t('Community name')} value={name} fullWidth
                                   onChange={e => {
                                       setName(e.target.value);
                                   }}
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
                        <NetworkSelect value={network} readonly={inProgress} onChange={v => {
                            setNetwork(v as NETWORK);
                        }}/>
                    </FormControl>
                    <FormControl fullWidth sx={{mb: '22px'}}>
                        <InputLabel id="strategy-select-label">{t('Voting Strategy')}</InputLabel>
                        <StrategySelect value={strategy} readonly={inProgress} onChange={(v) => {
                            setStrategy(v);
                            setStrategyOptions({} as StrategyOptionsRecord);
                        }}/>
                    </FormControl>
                    <StrategyOptionsForm strategy={strategy} readOnly={inProgress} values={strategyOptions} onChange={(values) => {
                        setStrategyOptions(values);
                    }}/>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: '20px'
                    }}>
                        {strategy === 'empty' ? <span/> :
                            <TestStrategyBtn strategy={strategy} network={network} strategyOptions={strategyOptions}/>}

                        <Button variant="contained" onClick={submit}
                                disabled={inProgress || authWindowState}>{t('Submit')}</Button>
                    </Box>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}

export default CreateSpace;
