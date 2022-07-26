import React from 'react';
import {RouteComponentProps} from '@reach/router';

import AppMenu from '../../layout/app-menu';
import PageHeader from '../../layout/app-header';
import AppContent from '../../layout/app-content';

const Home = (_: RouteComponentProps) => {
    return <>
        <AppMenu/>
        <AppContent>
            <PageHeader/>
        </AppContent>
    </>
}


export default Home;
