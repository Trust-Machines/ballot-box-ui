import React, {ChangeEvent, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import CloseModal from '../../../../components/close-modal';
import AuthRequired from '../../../../components/auth-required';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import useAuth from '../../../../hooks/use-auth';
import useNetwork from '../../../../hooks/use-network';
import useToast from '../../../../hooks/use-toast';

import {createSpace} from '../../../../api';
import {Space} from '../../../../types';

const CreateSpace = (props: { onSuccess: (space: Space) => void }) => {
    const inputRef = useRef<HTMLInputElement>();
    const [name, setName] = useState<string>('');
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [, showModal] = useModal();
    const [, showMessage] = useToast();
    const [t] = useTranslation();
    const {auth} = useAuth();
    const [network] = useNetwork();
    const {onSuccess} = props;

    const handleClose = () => {
        showModal(null);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setError('');
    }

    const submit = async () => {
        if (name.trim().length < 3) {
            setError(t('Space name length must be at least 3 characters long'));
            inputRef.current!.focus();
            return;
        }

        setInProgress(true);
        setError('');

        createSpace(auth!, network, name).then((r) => {
            showModal(null);
            showMessage(t('You new space created'), 'success');
            onSuccess(r);
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
        }).finally(() => {
            setInProgress(false);
        })
    }

    return (
        <>
            <DialogTitle>{t('Create space')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>
                    <TextField autoFocus inputRef={inputRef} label={t('Space name')} value={name} fullWidth
                               onChange={handleInputChange} error={error !== ''}
                               helperText={error || ' '}
                               InputProps={{
                                   autoComplete: 'off',
                                   endAdornment: inProgress ?
                                       <InputAdornment position="end">
                                           <CircularProgress color="primary"/>
                                       </InputAdornment> : null,
                                   readOnly: inProgress
                               }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={inProgress}>{t('Cancel')}</Button>
                <AuthRequired>
                    <Button onClick={submit} disabled={inProgress}>{t('Create')}</Button>
                </AuthRequired>
            </DialogActions>
        </>
    );
}

export default CreateSpace;
