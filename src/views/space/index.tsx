import React, {useEffect} from 'react';
import {RouteComponentProps, useParams} from '@reach/router';
import {Helmet} from 'react-helmet';
import {Box} from '@mui/material';

import SpaceCard from './components/space-card';
import SpaceEdit from './components/edit';
import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';

import useSpace from '../../hooks/use-space';
import AppContent from '../../layout/app-content';


const SpacePage = (_: RouteComponentProps) => {
    const {space, fetchSpace} = useSpace();
    const params = useParams();

    useEffect(() => {
        fetchSpace(params.spaceId).then();
    }, [params.spaceId]);

    if (!space) {
        return null;
    }

    return <>
        {space && <Helmet><title>{`${space.name} | BallotBox`}</title></Helmet>}
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <SpaceCard space={space}/>
                    <Box sx={{flexGrow: 1}}>
                        {params.section === 'edit' && <SpaceEdit/>}
                    </Box>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}


export default SpacePage;
