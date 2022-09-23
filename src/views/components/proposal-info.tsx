import {useEffect, useState} from 'react';
import moment from 'moment';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import strategies from '@trustmachines/ballot-box-strategies';

import ProposalStrategyInfo from './dialogs/proposal-strategy-info';
import ThemedBox from '../../components/themed-box';
import {H4} from '../../components/text';
import useTranslation from '../../hooks/use-translation';
import useStyles from '../../hooks/use-styles';
import useModal from '../../hooks/use-modal';
import {getBlock} from '../../api/stacks';
import {Proposal} from '../../types';
import {explorerLink} from '../../helper';


const ProposalInfo = (props: { proposal: Proposal }) => {
    const [t] = useTranslation();
    const {proposal} = props;
    const {linkColor, linkHoverColor} = useStyles();
    const [, showModal] = useModal();
    const [blockHash, setBlockHash] = useState('');


    useEffect(() => {
        if (proposal.startBlock) {
            getBlock(proposal.network, proposal.startBlock).then(r => {
                setBlockHash(r.hash);
            })
        }

    }, [proposal]);

    return <ThemedBox sx={{mb: '40px'}}>
        <H4 sx={{display: 'flex', alignItems: 'center'}}><InfoOutlinedIcon fontSize="small"
                                                                           sx={{mr: '6px'}}/> {t('Information')}
        </H4>
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '90px 1fr',
            gap: '8px',
            fontSize: '90%'
        }}>
            <Box>{t('Strategy')}</Box>
            {(() => {
                const strategy = strategies[proposal.strategy];
                if (Object.keys(strategy.schema).filter(a => strategy.schema[a].type !== 'hardcoded').length > 0) {
                    return <Box>
                        <Box
                            component="span"
                            sx={{
                                color: linkColor,
                                textDecoration: 'none',
                                cursor: 'pointer',
                                ':hover': {
                                    color: linkHoverColor
                                },
                            }}
                            onClick={() => {
                                showModal({
                                    body: <ProposalStrategyInfo proposal={proposal}/>
                                })
                            }}
                        >
                            {proposal.strategy}
                        </Box>
                    </Box>
                } else {
                    return <Box>{proposal.strategy} </Box>
                }
            })()}

            <Box>{t('Start Date')}</Box>
            <Box>{moment.unix(proposal.startTime).format('MMM Do YY, h:mm a')}</Box>
            <Box>{t('End Date')}</Box>
            <Box>{moment.unix(proposal.endTime).format('MMM Do YY, h:mm a')}</Box>
            <Box>{t('Network')}</Box>
            <Box>{proposal.network}</Box>

            {proposal.startBlock && (
                <>
                    <Box>{t('Snapshot')}</Box>
                    <Box>
                        <Box component="a"
                             onClick={(e) => {
                                 if (!blockHash) {
                                     e.preventDefault();
                                 }
                             }}
                             href={explorerLink(proposal.network, `/block/${blockHash}`)}
                             target="_blank"
                             rel="noreferrer"
                             sx={{
                                 color: linkColor,
                                 textDecoration: 'none',
                                 cursor: 'pointer',
                                 ':hover': {
                                     color: linkHoverColor
                                 },
                             }}>
                            {proposal.startBlock}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    </ThemedBox>
}

export default ProposalInfo;
