import React, {useMemo} from 'react';
import {Space} from '../../types';

const {createIcon} = require('@download/blockies');

const SpaceIcon = (props: { space:Space }) => {
    const {space} = props;
    const icon = useMemo(() => {
        return createIcon({
            seed: `${space.id}-${space.name}`,
            size: 10,
        }).toDataURL()
    }, [space]);

    return <img style={{borderRadius: '50%'}} src={icon} alt={space.name}/>;
}

export default SpaceIcon;
