import React from 'react';
import {Box} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

import {Space} from '../../types';
import {API_BASE} from '../../constants';

const SpaceIconBlock = (props: { space: Space, sx?: SxProps<Theme> }) => {
    const {space, sx} = props;
    return <Box sx={{
        ...{
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: 700
        },
        ...sx
    }}>
        {space.name.split('')[0].toUpperCase()}
    </Box>;
}

const SpaceIcon = (props: { space: Space, sx?: SxProps<Theme> }) => {
    const {space, sx} = props;
    if (!space.picture) {
        return <SpaceIconBlock {...props}/>
    }

    return <Box component="img" sx={{
        ...{
            borderRadius: '50%'
        },
        ...sx
    }} src={`${API_BASE}/${space.picture}`} alt={space.name}/>
}

export default SpaceIcon;
