import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Box} from '@mui/material';

import AppMenu from '../../layout/app-menu';
import PageHeader from '../../layout/page-header';

const Home = (_: RouteComponentProps) => {
    return <>
        <AppMenu/>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            flexShrink: 0
        }}>
            <PageHeader />

        </Box>
    </>
}


export default Home;
