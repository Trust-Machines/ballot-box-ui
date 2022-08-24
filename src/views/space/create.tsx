import React, {ChangeEvent, useEffect, useState} from 'react';
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
import {InputBaseProps} from '@mui/material/InputBase';
import {SelectChangeEvent} from '@mui/material/Select';

import AppMenu from '../../layout/app-menu';
import AppWrapper from '../../layout/app-wrapper';
import AppHeader from '../../layout/app-header';
import AppContent from '../../layout/app-content';
import {H2} from '../../components/text';
import AuthRequired from '../../components/auth-required';
import useTranslation from '../../hooks/use-translation';
import useAuth from '../../hooks/use-auth';
import useToast from '../../hooks/use-toast';
import {createSpace} from '../../api';
import {userSpacesAtom} from '../../store';

const StrategyOptions = (props: { strategy: string, readOnly: boolean, onChange: (values: Record<string, string>) => void }) => {
    const strategy = strategies[props.strategy];
    const schemaEntries = Object.keys(strategy.schema);

    const [values, setValues] = useState<Record<string, string>>(Object.fromEntries(new Map(schemaEntries.map(f => ([f, ''])))));

    useEffect(() => {
        props.onChange(values);
    }, [values])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, entryName: string) => {
        const value = formatValue(e.target.value, entryName);
        setValues({...values, ...{[entryName]: value}});
    }

    const formatValue = (value: string, entryName: string) => {
        const entry = strategy.schema[entryName];

        if (entry.type === 'number') {
            return value.replace(new RegExp(/[^\d]/, 'ig'), '');
        }

        return value.trim();
    }

    return <>{schemaEntries.map(entryName => {
        const entry = strategy.schema[entryName];
        const inputProps: InputBaseProps['inputProps'] = {};
        const value = values[entryName];

        // make ts happy
        if (entry.type === 'hardcoded') {
            return null;
        }

        switch (entry.type) {
            case 'string':
                inputProps['maxLength'] = entry.maxLength;
                break;
            case 'number':
                inputProps['type'] = 'number';
                break;
            case 'contract':
                inputProps['maxLength'] = 200;
        }

        return <Box sx={{mb: '20px'}} key={entryName}>
            <TextField name={entryName} fullWidth placeholder={entry.example}
                       label={entry.title} value={value} inputProps={inputProps}
                       InputProps={{
                           autoComplete: 'off',
                           readOnly: props.readOnly,
                       }}
                       onChange={(e) => {
                           handleChange(e, entryName);
                       }}
            />
        </Box>
    })}</>

}

const CreateSpace = (_: RouteComponentProps) => {
    const [t] = useTranslation();
    const {auth} = useAuth();
    const [, showMessage] = useToast();
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [network, setNetwork] = useState<string>('mainnet');
    const [strategy, setStrategy] = useState<string>('empty');
    const [strategyOptions, setStrategyOptions] = useState<any>({});
    const [isStrategyListOpen, setIsStrategyListOpen] = useState(false);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [userSpaces, setUserSpaces] = useAtom(userSpacesAtom);

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
        setNetwork(event.target.value as string);
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

    const submit = async () => {
        if (!canSubmit) {
            showMessage(t('Please fill all fields in the form'), 'error');
            return;
        }

        setInProgress(true);
        createSpace(auth!, name, network, strategy, strategyOptions).then(space => {
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
                        <StrategyOptions strategy={strategy} readOnly={inProgress} onChange={(values) => {
                            setStrategyOptions(values);
                        }}/>
                    </>)}
                    <AuthRequired inactive={!canSubmit}>
                        <Button variant="contained" onClick={submit} disabled={inProgress}>
                            {t('Submit')}
                        </Button>
                    </AuthRequired>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}

export default CreateSpace;
