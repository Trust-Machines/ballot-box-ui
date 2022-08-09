import React from 'react';
import Box from '@mui/material/Box';
import strategies from '@trustmachines/ballot-box-strategies';
import useTranslation from '../../../../hooks/use-translation';
import {Space} from '../../../../types';
import useStyles from '../../../../hooks/use-styles';

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
        return <Box>{schema[o].title}: {options[o]}</Box>
    })}</>
}


const SpaceInfo = (props: { space: Space }) => {
    const [t] = useTranslation();
    const {space} = props;
    const styles = useStyles();

    return <Box>
        <Box sx={{fontSize: '20px', fontWeight: '600', mb: '20px'}}>{t('Network')}</Box>
        <Box sx={{color: styles.mutedTextColor}}>{space.network}</Box>

        <Box sx={{fontSize: '20px', fontWeight: '600', m: '20px 0'}}>{t('Voting Strategy')}</Box>
        <Box sx={{color: styles.mutedTextColor}}>{strategies[space.strategy].description}</Box>

        <Box sx={{fontSize: '20px', fontWeight: '600', m: '20px 0'}}>{t('Strategy Options')}</Box>
        <StrategyOptions space={space}/>
    </Box>
}

export default SpaceInfo;
