import React from 'react';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import useStyles from '../../hooks/use-styles';

export const H2 = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const sx = {
        ...{
            fontSize: '26px',
            fontWeight: '600',
            mb: '20px'
        },
        ...props.sx
    };
    return <Box sx={sx}>{props.children}</Box>;
}

export const H3 = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const sx = {
        ...{
            fontSize: '20px',
            fontWeight: '600',
            mb: '14px'
        },
        ...props.sx
    };
    return <Box sx={sx}>{props.children}</Box>;
}

export const H4 = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const sx = {
        ...{
            fontSize: '18px',
            fontWeight: '600',
            mb: '8px'
        },
        ...props.sx
    };
    return <Box sx={sx}>{props.children}</Box>;
}


export const H5 = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const sx = {
        ...{
            fontSize: '16px',
            fontWeight: '600',
            mb: '6px'
        },
        ...props.sx
    };
    return <Box sx={sx}>{props.children}</Box>;
}


export const Muted = (props: { children: React.ReactNode, sx?: SxProps<Theme> }) => {
    const styles = useStyles();

    const sx = {
        ...{
            color: styles.mutedTextColor
        },
        ...props.sx
    };
    return <Box sx={sx}>{props.children}</Box>;
}
