import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useParams} from '@reach/router';
import {Helmet} from 'react-helmet';
import {Box, useTheme} from '@mui/material';


import SpaceCard from './components/space-card';
import SpaceEdit from './components/edit';
import SpaceInfo from './components/info';
import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';

import {spaceAtom} from '../../store';

import AppContent from '../../layout/app-content';
import {getSpace} from '../../api';


const SpacePage = (_: RouteComponentProps) => {
    const [space, setSpace] = useAtom(spaceAtom);
    const params = useParams();
    const theme = useTheme();

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
                        {!params.section && (
                            <>
                                {space.about && (
                                    <Box sx={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        padding: '16px',
                                        borderRadius: '12px',
                                        flexGrow: 0,
                                        flexShrink: 0,
                                        textAlign: 'center',
                                        wordWrap: 'break-word',
                                    }}>
                                        {space.about}
                                    </Box>
                                )}
                            </>
                        )}
                        {params.section === 'edit' && <SpaceEdit space={space}/>}
                        {params.section === 'info' && <SpaceInfo space={space}/>}
                    </Box>
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}


export default SpacePage;
