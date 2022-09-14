import React, {useState} from 'react';
import {useAtom} from 'jotai';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import CloseModal from '../../../components/close-modal';
import useModal from '../../../hooks/use-modal';
import useToast from '../../../hooks/use-toast';
import useRequireAuth from '../../../hooks/use-require-auth';
import useTranslation from '../../../hooks/use-translation';
import {deleteProposal} from '../../../api/ballot-box';
import {authWindowStateAtom} from '../../../store';
import {Proposal} from '../../../types';


const DeleteProposal = (props: { proposal: Proposal, onSuccess: () => void }) => {
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const {proposal, onSuccess} = props;
    const requireAuthSignature = useRequireAuth();
    const [, showMessage] = useToast();
    const [authWindowState] = useAtom(authWindowStateAtom);

    const handleClose = () => {
        showModal(null);
    };

    const handleConfirm = async () => {

        const auth = await requireAuthSignature();

        setInProgress(true);
        deleteProposal(auth, proposal.id).then(() => {
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
                <Button color="error" onClick={handleConfirm}
                        disabled={inProgress || authWindowState}>{t('Delete')}</Button>
            </DialogActions>
        </>
    );
}

export default DeleteProposal;
