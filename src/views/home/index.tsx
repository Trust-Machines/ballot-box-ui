import React, {useEffect} from 'react';
import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';
import {useAtom} from 'jotai';
import Box from '@mui/material/Box';

import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';
import AppContent from '../../layout/app-content';
import SpaceCardSmall from '../components/space-card-small';
import {H2} from '../../components/text';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import useTranslation from '../../hooks/use-translation';
import {getSpaces} from '../../api/ballot-box';
import {spacesAtom} from '../../store';

const HomePage = (_: RouteComponentProps) => {
    const [spaces, setSpaces] = useAtom(spacesAtom);
    const [isSm, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();

    useEffect(() => {
        if (spaces.length > 0) {
            return;
        }

        getSpaces().then(r => {
            setSpaces(r);
        })
    }, []);

    return <>
        <Helmet><title>BallotBox</title></Helmet>
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <H2>{t('Spaces')}</H2>
                <Box sx={{
                    display: 'grid',
                    gridGap: '30px',
                    gridTemplateColumns: isMd ? '1fr 1fr 1fr' : (isSm ? '1fr 1fr' : '1fr')
                }}>
                    {spaces.map(s => <SpaceCardSmall key={s.id} space={s}/>)}
                </Box>
            </AppContent>
        </AppWrapper>
    </>
}


export default HomePage;
