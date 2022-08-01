import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';


import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';

import useSpace from '../../hooks/use-space';

const SpacePage = (_: RouteComponentProps) => {
    const {space} = useSpace();

    return <>
        {space && <Helmet><title>{`${space.name} | BallotBox`}</title></Helmet>}
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
        </AppWrapper>
    </>
}


export default SpacePage;
