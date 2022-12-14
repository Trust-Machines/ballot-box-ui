import React from 'react';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import strategies from '@trustmachines/ballot-box-strategies';
import useTranslation from '../../hooks/use-translation';

const descriptionOverrides: Record<string, string> = {
    'sip-009-balance': 'NFT collection',
}

const StrategySelect = (props: { value: string, readonly: boolean, onChange: (value: string) => void }) => {
    const {value, readonly, onChange} = props;
    const [t] = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    }

    let strategyOptionList = Object.keys(strategies).map(s => ({
        label: descriptionOverrides[s] || strategies[s].description,
        value: s
    })).sort(x => x.value === 'sip-009-balance' ? -1 : 1)

    return <Select
        labelId="strategy-select-label"
        id="strategy-select"
        value={value}
        label={t('Voting Strategy')}
        onChange={handleChange}
        readOnly={readonly}
    >
        {strategyOptionList.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
    </Select>
}

export default StrategySelect
