import React, {ChangeEvent, useRef, useState} from 'react';
import Joi from 'joi';
import {useAtom} from 'jotai';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';

import useTranslation from '../../hooks/use-translation';


import AppMenu from '../../layout/app-menu';
import AppWrapper from '../../layout/app-wrapper';
import AppHeader from '../../layout/app-header';
import AppContent from '../../layout/app-content';

import {getStrategies} from '../../api';

const StrategySelector = () => {
    const [t] = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    let options: {
        label: string,
        value: string
    }[] = [];

    if (!isOpen) {
        options = [{
            label: 'Click to select',
            value: '---'
        }, ...options]
    }

    return <FormControl sx={{mb: '20px'}} fullWidth>
        <InputLabel id="strategy-select-label">{t('Voting Strategy')}</InputLabel>
        <Select
            labelId="strategy-select-label"
            id="strategy-select"
            value={'---'}
            label={t('Voting Strategy')}
            onOpen={() => {
                setIsOpen(true);
            }}

            onClose={() => {
                setIsOpen(false);
            }}
        >
            {options.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}

        </Select>
    </FormControl>
}

const CreateSpace = (_: RouteComponentProps) => {
    const [t] = useTranslation();
    const inputRef = useRef<HTMLInputElement>();
    const [name, setName] = useState<string>('');
    const [network, setNetwork] = useState<string>('mainnet');
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setError('');
    }

    const handleNetworkChange = (event: SelectChangeEvent) => {
        setNetwork(event.target.value as string);
        setError('');
    };

    return <>
        <Helmet><title>BallotBox | Create a space</title></Helmet>
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <Box sx={{maxWidth: '600px'}}>
                    <Box sx={{fontSize: '26px', fontWeight: '600', mb: '20px'}}>{t('Create space')}</Box>
                    <TextField autoFocus inputRef={inputRef} label={t('Space name')} value={name} fullWidth
                               onChange={handleInputChange} error={error !== ''}
                               helperText={error || ' '}
                               inputProps={{
                                   maxLength: 30
                               }}
                               InputProps={{
                                   autoComplete: 'off',
                                   endAdornment: inProgress ?
                                       <InputAdornment position="end">
                                           <CircularProgress color="primary"/>
                                       </InputAdornment> : null,
                                   readOnly: inProgress,

                               }}
                    />
                    <FormControl sx={{mb: '20px'}} fullWidth>
                        <InputLabel id="network-select-label">{t('Network')}</InputLabel>
                        <Select
                            labelId="network-select-label"
                            id="network-select"
                            value={network}
                            label={t('Network')}
                            onChange={handleNetworkChange}
                        >
                            <MenuItem value="mainnet">Mainnet</MenuItem>
                            <MenuItem value="testnet">Testnet</MenuItem>
                        </Select>
                    </FormControl>
                    <StrategySelector/>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}

export default CreateSpace;
