import React from 'react'
import Box from '@mui/material/Box';
import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';

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
                    dd
                </ThemedBox>
            </AppContent>
        </AppWrapper>
    </>
}


export default CreateSpace;
