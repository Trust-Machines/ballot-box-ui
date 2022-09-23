import React from 'react';
import Button from '@mui/material/Button';
import strategies from '@trustmachines/ballot-box-strategies';

import TestStrategy from './dialogs/test-strategy';
import useModal from '../../hooks/use-modal';
import useTranslation from '../../hooks/use-translation';
import useToast from '../../hooks/use-toast';
import {NETWORK} from '../../types';

export const TestStrategyBtn = (props: { strategy: string, network: NETWORK, strategyOptions: any }) => {
    const [t] = useTranslation();
    const {strategy, strategyOptions} = props;
    const [, showModal] = useModal();
    const [, showMessage] = useToast();

    const test = () => {
        const strategyOptionsValid = Object.keys(strategies[strategy].schema).filter(x => strategies[strategy].schema[x].type !== 'hardcoded').find(x => !strategyOptions[x]) === undefined;

        if (!strategyOptionsValid) {
            showMessage(t('Please fill all strategy options'), 'error');
            return;
        }

        // Append hardcoded values to options
        const options = {...strategyOptions};
        for (let k of Object.keys(strategies[strategy].schema)) {
            const item = strategies[strategy].schema[k];
            if (item.type === 'hardcoded') {
                options[k] = item.value;
            }
        }

        showModal({
            body: <TestStrategy {...props} strategyOptions={options}/>
        });
    }

    if (strategy === 'empty') {
        return null;
    }

    return <Button variant="outlined" onClick={test} color="info" size="small">{t('Test Strategy')}</Button>
}

export default TestStrategyBtn;
