import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import moment from 'moment';
import {useEffect, useState} from 'react';

import ThemedBox from '../../components/themed-box';
import {H4} from '../../components/text';
import useTranslation from '../../hooks/use-translation';
import useStyles from '../../hooks/use-styles';
import {getBlock} from '../../api/stacks';
import {Proposal} from '../../types';
import {explorerLink} from '../../helper';


const ProposalInfo = (props: { proposal: Proposal }) => {
    const [t] = useTranslation();
    const {proposal} = props;
    const {linkColor, linkHoverColor} = useStyles();
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
            <Box>{proposal.strategy}</Box>
            <Box>{t('Start Date')}</Box>
            <Box>{moment.unix(proposal.startTime).format('MMM Do YY, h:mm a')}</Box>
            <Box>{t('End Date')}</Box>
            <Box>{moment.unix(proposal.endTime).format('MMM Do YY, h:mm a')}</Box>
            {proposal.startBlock && (
                <>
                    <Box>{t('Snapshot')}</Box>
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
                </>
            )}
        </Box>

    </ThemedBox>
}

export default ProposalInfo;
