import React, {useRef, useState} from 'react';
import Cropper from 'react-cropper';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import AuthRequired from '../../../../components/auth-required';
import CloseModal from '../../../../components/close-modal';
import useModal from '../../../../hooks/use-modal';
import useAuth from '../../../../hooks/use-auth';
import {updateSpacePicture} from '../../../../api';
import {Space} from '../../../../types';
import 'cropperjs/dist/cropper.css';

const SpacePicture = (props: { space: Space }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const cropperRef = useRef<HTMLImageElement>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [, showModal] = useModal();
    const [imgSrc, setImgSrc] = useState('');
    const [croppedImg, setCroppedImg] = useState('');
    const {space} = props;
    const {auth} = useAuth();

    const handleClose = () => {
        showModal(null);
    };

    const submit = async () => {
        setInProgress(true);
        updateSpacePicture(auth!, space!.id, croppedImg).then(r => {
            console.log(r)
        }).finally(() => {
            setInProgress(false);
        })
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

    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        const data = cropper.getCroppedCanvas().toDataURL().replace('data:image/png;base64,', '');
        setCroppedImg(data);
    };

    return (
        <>
            <DialogTitle><CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <Box sx={{p: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {imgSrc === '' && (
                        <Button variant="contained" onClick={() => {
                            inputRef.current!.click();
                        }}>Select file</Button>
                    )}
                    {imgSrc !== '' && (
                        <>

                            <Cropper
                                ref={cropperRef}
                                src={imgSrc}
                                style={{height: 300, width: '100%'}}
                                background={false}
                                aspectRatio={1}
                                responsive
                                center
                                zoomable={false}
                                scalable={false}
                                cropBoxResizable={false}
                                guides={false}
                                crop={onCrop}
                            />

                            <Box>
                                <AuthRequired>
                                    <Button variant="contained" sx={{mr: '10px'}} onClick={submit}>Upload</Button>
                                </AuthRequired>
                                <Button onClick={() => {
                                    setImgSrc('');
                                }}>Back</Button>
                            </Box>
                        </>
                    )}
                </Box>
                <input type="file" accept="image/*" ref={inputRef} onChange={onSelectFile} style={{display: 'none'}}/>
            </DialogContent>
        </>
    );
}

export default SpacePicture;
