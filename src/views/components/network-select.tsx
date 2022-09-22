import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useTranslation from '../../hooks/use-translation';

const NetworkSelect = (props: { value: string, readonly: boolean, onChange: (value: string) => void }) => {
    const {value, readonly, onChange} = props;
    const [t] = useTranslation();

    return <Select
        fullWidth
        id="network-select"
        value={value}
        label={t('Network')}
        onChange={(e) => {
            onChange(e.target.value);
        }}
        readOnly={readonly}
    >
        <MenuItem value="mainnet">Mainnet</MenuItem>
        <MenuItem value="testnet">Testnet</MenuItem>
    </Select>
}

export default NetworkSelect
