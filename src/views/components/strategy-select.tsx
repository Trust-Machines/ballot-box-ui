import React, {useState} from 'react';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import strategies from '@trustmachines/ballot-box-strategies';
import useTranslation from '../../hooks/use-translation';

const StrategySelect = (props: { value: string, readonly: boolean, onChange: (value: string) => void }) => {
    const {value, readonly, onChange} = props;
    const [t] = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    }

    let strategyOptionList = Object.keys(strategies).map(s => ({
        label: strategies[s].description,
        value: s
    }));

    if (!isOpen) {
        strategyOptionList = [{
            label: 'Click to select',
            value: 'empty'
        }, ...strategyOptionList]
    }

    return <Select
        labelId="strategy-select-label"
        id="strategy-select"
        value={value}
        label={t('Voting Strategy')}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        readOnly={readonly}
    >
        {strategyOptionList.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
    </Select>
}

export default StrategySelect
