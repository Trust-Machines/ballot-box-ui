import React from 'react';
import {useNavigate} from '@reach/router';
import Box from '@mui/material/Box';

import {useTheme} from '@mui/material';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';


const Brand = () => {
    const [isSm] = useMediaBreakPoint();
    const navigate = useNavigate();
    const theme = useTheme();
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
                    overflow: 'hidden',
                    marginRight: '8px',
                    background: '#E5F2FF',
                    border: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box component="img" src="/logo.png" sx={{width: '38px', height: '38px'}}/>
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
