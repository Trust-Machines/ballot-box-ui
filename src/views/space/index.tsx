import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useParams} from '@reach/router';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';

import SpaceEdit from './sections/edit';
import SpaceInfo from './sections/info';
import Proposals from './sections/proposals';
import ProposalCreate from './sections/create-proposal';
import SpaceCard from '../components/space-card';
import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';
import AppContent from '../../layout/app-content';
import {spaceAtom} from '../../store';
import {getSpace} from '../../api/ballot-box';


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


    return <>
        {space && <Helmet><title>{`${space.name} | BallotBox`}</title></Helmet>}
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                {(() => {
                    if (!space) {
                        return null;
                    }

                    return <Box sx={{display: 'flex', flexDirection: 'column'}}>
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
                                            mb: '20px'
                                        }}>
                                            {space.about}
                                        </Box>
                                    )}
                                    <Proposals space={space}/>
                                </>
                            )}
                            {params.section === 'new-proposal' && <ProposalCreate space={space}/>}
                            {params.section === 'edit' && <SpaceEdit space={space}/>}
                            {params.section === 'info' && <SpaceInfo space={space}/>}
                        </Box>
                    </Box>;
                })()}
            </AppContent>
        </AppWrapper>
    </>
}


export default SpacePage;
