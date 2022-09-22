import React, {ChangeEvent, useEffect} from 'react';
import {InputBaseProps} from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import strategies from '@trustmachines/ballot-box-strategies';
import Box from '@mui/material/Box';
import useTranslation from '../../hooks/use-translation';


const StrategyOptionsForm = (props: { strategy: string, readOnly: boolean, values: Record<string, any>, onChange: (res: { isValid: boolean, values: Record<string, string> }) => void }) => {
    const [t] = useTranslation();
    const {values, onChange} = props;

    const strategy = strategies[props.strategy];
    const schemaEntries = Object.keys(strategy.schema);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, entryName: string) => {
        const value = formatValue(e.target.value, entryName);
        const newValues = {...values, ...{[entryName]: value}};
        onChange({values: newValues, isValid: false});
    }

    const formatValue = (value: string, entryName: string) => {
        const entry = strategy.schema[entryName];

        if (entry.type === 'number') {
            return value.replace(new RegExp(/[^\d]/, 'ig'), '');
        }

        return value.trim();
    }

    const showStrategyOptions = props.strategy !== 'empty' &&
        Object.keys(strategies[props.strategy].schema).filter(a => strategies[props.strategy].schema[a].type !== 'hardcoded').length > 0;

    useEffect(() => {
        if (!showStrategyOptions) {
            onChange({values: {}, isValid: true});
        }
    }, [showStrategyOptions]);

    if (!showStrategyOptions) {
        return null;
    }

    return <>
        <Box sx={{mb: '16px', fontSize: '18px'}}>{t('Strategy options')}</Box>

        {schemaEntries.map(entryName => {
            const entry = strategy.schema[entryName];
            const inputProps: InputBaseProps['inputProps'] = {};
            const value = values[entryName] || '';

            // make ts happy
            if (entry.type === 'hardcoded') {
                return null;
            }

            switch (entry.type) {
                case 'string':
                    inputProps['maxLength'] = entry.maxLength;
                    break;
                case 'number':
                    inputProps['type'] = 'number';
                    break;
                case 'contract':
                    inputProps['maxLength'] = 200;
            }

            return <FormControl fullWidth key={entryName}>
                <TextField name={entryName} fullWidth placeholder={entry.example}
                           label={entry.title} value={value} inputProps={inputProps}
                           InputProps={{
                               autoComplete: 'off',
                               readOnly: props.readOnly,
                           }}
                           onChange={(e) => {
                               handleChange(e, entryName);
                           }}
                           helperText={' '}
                />
                {entry.help ? <FormHelperText>{entry.help}</FormHelperText> : ''}
            </FormControl>
        })}</>
}

export default StrategyOptionsForm;
