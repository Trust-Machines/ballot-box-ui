import React from 'react'
import Box from '@mui/material/Box';
import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';
import AppContent from '../../layout/app-content';
import useTranslation from '../../hooks/use-translation';
import ThemedBox from '../../components/themed-box';


const CreateSpace = (_: RouteComponentProps) => {
    const [t] = useTranslation();
    return <>
        <Helmet><title>{t('Create a space')}</title></Helmet>
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <Box sx={{fontSize: '26px', fontWeight: '600', mb: '20px'}}>{t('Create a space')}</Box>
                <ThemedBox>
                    <Box>
                        <TextField label={t('Space name')} inputProps={{maxLength: 30}}
                                   fullWidth autoFocus autoComplete="off"/>
                    </Box>
                    <Box sx={{mt: '12px'}}>
                        <TextField label={t('About')} inputProps={{maxLength: 250}}
                                   fullWidth autoFocus autoComplete="off"/>
                    </Box>
                    <Box sx={{mt: '12px'}}>
                        <TextField label={t('Website')} placeholder="https://superdao.com" inputProps={{maxLength: 150}}
                                   fullWidth autoFocus autoComplete="off"/>
                    </Box>
                    <Box sx={{mt: '12px'}}>
                        <TextField label={t('Terms')} placeholder="https://forum.superdao.com/terms"
                                   inputProps={{maxLength: 150}}
                                   fullWidth autoFocus autoComplete="off"/>
                    </Box>
                    <Box sx={{mt: '12px'}}>
                        <TextField label={t('Twitter')} placeholder="superdao"
                                   inputProps={{maxLength: 40}}
                                   fullWidth autoFocus autoComplete="off"/>
                    </Box>
                    <Box sx={{mt: '12px'}}>
                        <TextField label={t('Github')} placeholder="superdao_code"
                                   inputProps={{maxLength: 40}}
                                   fullWidth autoFocus autoComplete="off"/>
                    </Box>
                    <Box sx={{mt: '12px', display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained">Create</Button>
                    </Box>
                </ThemedBox>
            </AppContent>
        </AppWrapper>
    </>
}


export default CreateSpace;
