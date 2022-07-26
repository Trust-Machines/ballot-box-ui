import React from 'react';
import {RouteComponentProps} from '@reach/router';

import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppContent from '../../layout/app-content';

const Home = (_: RouteComponentProps) => {
    return <>
        <AppMenu/>
        <AppContent>
            <AppHeader/>
        </AppContent>
    </>
}


export default Home;
