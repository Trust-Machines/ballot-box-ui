import React from 'react';
import Chip from '@mui/material/Chip';
import {NETWORK} from '../../types'

const NetworkLabel = (props: { network: NETWORK, onClick?: () => void }) => {
    return <Chip sx={{
        cursor: props.onClick ? 'pointer' : null,
        textTransform: 'capitalize',
        borderRadius: '26px',
        height: '24px'
    }} label={props.network} color={props.network === 'mainnet' ? 'primary' : 'default'} onClick={props.onClick}/>;
}

export default NetworkLabel;
