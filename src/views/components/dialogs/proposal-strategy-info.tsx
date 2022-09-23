import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import strategies from '@trustmachines/ballot-box-strategies';
import {Muted} from '../../../components/text';
import CloseModal from '../../../components/close-modal';
import useModal from '../../../hooks/use-modal';
import {Proposal} from '../../../types';

const ProposalStrategyInfo = (props: { proposal: Proposal }) => {
    const [, showModal] = useModal();
    const {proposal} = props;
    const {strategyOptions: options} = proposal;
    const strategy = strategies[proposal.strategy];
    const {schema} = strategy;
    const keys = Object.keys(options);

    const handleClose = () => {
        showModal(null);
    };

    return (
        <>
            <DialogTitle><CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <>{keys.map(o => {
                    return <Box key={o} sx={{mb: '10px', wordWrap: 'break-word'}}>
                        <Box sx={{mb: '6px'}}>{schema[o].title}</Box> <Muted>{options[o]}</Muted>
                    </Box>
                })}</>
            </DialogContent>
        </>
    );
}

export default ProposalStrategyInfo;
