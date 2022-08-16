import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {alpha} from '@mui/material';
import useStyles from '../../../hooks/use-styles';
import useTranslation from '../../../hooks/use-translation';
import {ProposalWithSpace} from '../../../types';

const ProposalBody = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const styles = useStyles();
    const [t] = useTranslation();
    const bodyRef = useRef<HTMLDivElement | null>(null);
    const [bodyHeight, setBodyHeight] = useState<number | null>(null);
    const [showAllBody, setShowAllBody] = useState(false);

    useEffect(() => {
        if (bodyHeight !== null) {
            return;
        }

        setBodyHeight(bodyRef.current?.clientHeight || 0);
    });

    const longBody = bodyHeight && bodyHeight > 420;

    const showMore = longBody && !showAllBody ? <Box sx={{
        background: `linear-gradient(0deg, ${alpha(styles.appBg, 1)}  0%, rgba(0,0,0,0) 100%)`,
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '0',
        height: '60px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
    }}><Button variant="outlined" size="small" sx={{
        background: styles.appBg,
        ':hover': {
            background: styles.appBg,
        }
    }} onClick={() => {
        setShowAllBody(true)
    }}>{t('Show more')}</Button></Box> : null;

    const showLess = longBody && showAllBody ? <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '20px'
    }}><Button variant="outlined" size="small" sx={{
        background: styles.appBg,
        ':hover': {
            background: styles.appBg,
        }
    }} onClick={() => {
        setShowAllBody(false)
    }}>{t('Show less')}</Button></Box> : null;

    return <>
        <Box sx={{
            fontSize: '18px',
            lineHeight: '28px',
            position: 'relative',
            height: longBody && !showAllBody ? '420px' : null,
            overflow: longBody && !showAllBody ? 'hidden' : null,
        }} ref={bodyRef}>
            {showMore}
            {proposal.body?.split('\n').map((x, i) => <Box sx={{mt: 0}} component="p" key={i}>{x}</Box>)}
            {showLess}
        </Box>
    </>
}

export default ProposalBody;
