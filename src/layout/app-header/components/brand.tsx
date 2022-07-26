import React from 'react';
import {useNavigate} from '@reach/router';
import Box from '@mui/material/Box';

import useMediaBreakPoint from '../../../hooks/use-media-break-point';


const Brand = () => {
    const [isSm] = useMediaBreakPoint();
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: isSm ? 'flex' : 'none',
            alignItems: 'center',
        }}>
            <Box sx={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
            }} onClick={() => {
                navigate('/').then();
            }}>
                <Box sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginRight: '8px',
                    background: '#F9A3A5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    'img': {
                        width: '32px',
                        height: '32px'
                    }
                }}>

                </Box>
                <Box sx={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                }}>BallotBox</Box>
            </Box>
        </Box>
    );
}

export default Brand;
