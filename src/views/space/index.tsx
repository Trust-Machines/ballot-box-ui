import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useParams} from '@reach/router';
import {Helmet} from 'react-helmet';
import {Box} from '@mui/material';


import SpaceCard from './components/space-card';
import SpaceEdit from './components/edit';
import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';

import {spaceAtom} from '../../store';

import AppContent from '../../layout/app-content';
import {getSpace} from '../../api';


const SpacePage = (_: RouteComponentProps) => {
    const [space, setSpace] = useAtom(spaceAtom);
    const params = useParams();

    useEffect(() => {
        if (space?.id === Number(params.spaceId)) {
            return;
        }

        getSpace(Number(params.spaceId)).then(r => {
            setSpace(r);
            return r;
        });
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
                    <Box sx={{flexGrow: 1, mt: '20px'}}>
                        {params.section === 'edit' && <SpaceEdit space={space}/>}
                    </Box>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}


export default SpacePage;
