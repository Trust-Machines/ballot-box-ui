import React, {useMemo} from 'react';
import {Box} from '@mui/material';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';

import {Space} from '../../types';

const {createIcon} = require('@download/blockies');

const SpaceIcon = (props: { space: Space, sx?: SxProps<Theme> }) => {
    const {space, sx} = props;
    const icon = useMemo(() => {
        return createIcon({
            seed: `${space.id}-${space.name}`,
            size: 12,
        }).toDataURL()
    }, [space]);

    return <Box component="img" sx={{
        ...{
            borderRadius: '50%'
        },
        ...sx
    }} src={icon} alt={space.name}/>;
}

export default SpaceIcon;
