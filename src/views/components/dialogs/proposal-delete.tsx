import React, {useState} from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import AuthRequired from '../../../components/auth-required';
import CloseModal from '../../../components/close-modal';
import useModal from '../../../hooks/use-modal';
import useToast from '../../../hooks/use-toast';
import useAuth from '../../../hooks/use-auth';
import useTranslation from '../../../hooks/use-translation';
import {deleteProposal} from '../../../api/ballot-box';
import {Proposal} from '../../../types';

const DeleteProposal = (props: { proposal: Proposal, onSuccess: () => void }) => {
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const {proposal, onSuccess} = props;
    const {auth} = useAuth();
    const [, showMessage] = useToast();

    const handleClose = () => {
        showModal(null);
    };

    const handleConfirm = async () => {
        setInProgress(true);
        deleteProposal(auth!, proposal.id).then(() => {
            showModal(null);
            onSuccess();
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
            setInProgress(false);
        });
    }

    return (
        <>
            <DialogTitle>{t('Delete Proposal')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <DialogContentText>{t('Do you really want to delete this proposal?')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={inProgress}>{t('Cancel')}</Button>
                <AuthRequired><Button color="error" onClick={handleConfirm} disabled={inProgress}>{t('Delete')}</Button></AuthRequired>
            </DialogActions>
        </>
    );
}

export default DeleteProposal;
