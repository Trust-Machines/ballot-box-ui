import React from 'react';
import Box from '@mui/material/Box';
import strategies from '@trustmachines/ballot-box-strategies';
import useTranslation from '../../../../hooks/use-translation';
import {H3, Muted} from '../../../../components/text';
import {Space} from '../../../../types';

const StrategyOptions = (props: { space: Space }) => {
    const {space} = props;
    const {strategyOptions: options} = space;
    const strategy = strategies[space.strategy];
    const {schema} = strategy;
    const keys = Object.keys(options);
    if (keys.length === 0) {
        return <>---</>;
    }

    return <>{keys.map(o => {
        return <Box key={o} sx={{mb: '10px', wordWrap: 'break-word'}}>
           <Muted><strong>{schema[o].title}</strong>: {options[o]}</Muted>
        </Box>
    })}</>
}


const SpaceInfo = (props: { space: Space }) => {
    const [t] = useTranslation();
    const {space} = props;

    return <>
        <Box sx={{mb: '20px'}}>
            <H3>{t('Network')}</H3>
            <Muted>{space.network}</Muted>
        </Box>
        <Box sx={{mb: '20px'}}>
            <H3>{t('Voting Strategy')}</H3>
            <Muted>{strategies[space.strategy].description}</Muted>
        </Box>
        <Box sx={{mb: '20px'}}>
            <H3>{t('Strategy Options')}</H3>
            <StrategyOptions space={space}/>
        </Box>
    </>
}

export default SpaceInfo;
