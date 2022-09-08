import React from 'react';
import Box from '@mui/material/Box';
import {Trans} from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useTheme} from '@mui/material';
import CloseModal from '../../components/close-modal';
import useStyles from '../../hooks/use-styles';
import useTranslation from '../../hooks/use-translation';
import useModal from '../../hooks/use-modal';


const ContactDialog = () => {
    const [t, i18n] = useTranslation();
    const [, showModal] = useModal();
    const {linkColor, linkHoverColor} = useStyles();

    const handleClose = () => {
        showModal(null);
    };

    return <>
        <DialogTitle>{t('Contact')}<CloseModal onClick={handleClose}/></DialogTitle>
        <DialogContent>
            <DialogContentText>
                <Trans
                    i18n={i18n}
                    defaults="If you have any questions or encounter issues, please contact us at <0>hello@console.xyz</0>"
                    components={[<Box sx={{
                        color: linkColor,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        ':hover': {color: linkHoverColor}
                    }} component="a" href="mailto:hello@console.xyz"/>]}
                />
            </DialogContentText>
        </DialogContent>
    </>;
}

const AppFooter = () => {
    const theme = useTheme();
    const {linkColor, linkHoverColor} = useStyles();
    const [t] = useTranslation();
    const [, showModal] = useModal();

    return <Box sx={{
        height: '50px',
        flexGrow: 0,
        flexShrink: 0,
        borderTop: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '90%'
    }}>
        <Box sx={{
            color: linkHoverColor,
            textDecoration: 'none',
            cursor: 'pointer',
            ':hover': {color: linkColor}
        }} onClick={() => {
            showModal({body: <ContactDialog/>})
        }}>{t('Contact')}</Box>
    </Box>
}

export default AppFooter;
