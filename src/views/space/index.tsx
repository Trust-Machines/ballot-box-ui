import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';

import SpaceCard from './components/space-card';
import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';

import useSpace from '../../hooks/use-space';
import AppContent from '../../layout/app-content';


const SpacePage = (_: RouteComponentProps) => {
    const {space} = useSpace();

    return <>
        {space && <Helmet><title>{`${space.name} | BallotBox`}</title></Helmet>}
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                {space && (
                    <SpaceCard space={space}/>
                )}
            </AppContent>
        </AppWrapper>
    </>
}


export default SpacePage;
