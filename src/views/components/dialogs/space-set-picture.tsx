import React, {useRef, useState} from 'react';
import {useAtom} from 'jotai';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

import CloseModal from '../../../components/close-modal';
import useModal from '../../../hooks/use-modal';
import useToast from '../../../hooks/use-toast';
import useRequireAuth from '../../../hooks/use-require-auth';
import useTranslation from '../../../hooks/use-translation';
import {updateSpacePicture} from '../../../api/ballot-box';
import {authWindowStateAtom} from '../../../store';
import {Space} from '../../../types';

const SetSpacePicture = (props: { space: Space, onSuccess: (space: Space) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [, showMessage] = useToast();
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState('');
    const {space, onSuccess} = props;
    const requireAuthSignature = useRequireAuth();
    const [authWindowState] = useAtom(authWindowStateAtom);

    const handleClose = () => {
        showModal(null);
    };

    const submit = async () => {
        const auth = await requireAuthSignature();

        setInProgress(true);
        const data = imgSrc.split(',')[1];
        updateSpacePicture(auth!, space!.id, data).then(r => {
            showModal(null);
            showMessage(t('Community picture updated'), 'success');
            onSuccess(r);
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
        }).finally(() => {
            setInProgress(false);
        });
    }

    const selectFile = () => {
        setImgSrc('');
        inputRef.current!.click();
    }

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', async () => {
                const imgSrc = reader.result?.toString();
                if (!imgSrc) {
                    return;
                }
                setImgSrc(imgSrc);
            })
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <>
            <DialogTitle>{t('Set Community Picture')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <Box sx={{p: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {imgSrc === '' && (
                        <>
                            <Button variant="contained" onClick={selectFile}
                                    sx={{mb: '12px'}}>{t('Select file')}</Button>
                            <FormHelperText>{t('Recommended 200 x 200 pixels. Maximum file size of 1mb.')}</FormHelperText>
                        </>
                    )}
                    {imgSrc !== '' && (
                        <>
                            <Box component="img" sx={{width: '200px', height: '200px', borderRadius: '50%', mb: '20px'}}
                                 src={imgSrc}/>
                            <Box>
                                <Button disabled={inProgress || authWindowState} variant="contained" sx={{mr: '10px'}}
                                        onClick={submit}>{t('Upload')}</Button>
                                <Button disabled={inProgress || authWindowState}
                                        onClick={selectFile}>{t('Select another file')}</Button>
                            </Box>
                        </>
                    )}
                </Box>
                <input type="file" accept="image/*" ref={inputRef} onChange={onSelectFile} style={{display: 'none'}}/>
            </DialogContent>
        </>
    );
}

export default SetSpacePicture;
