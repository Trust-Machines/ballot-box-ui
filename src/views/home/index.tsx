import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';

import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';

const Home = (_: RouteComponentProps) => {
    return <>
        <Helmet><title>BallotBox</title></Helmet>
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
        </AppWrapper>
    </>
}


export default Home;
