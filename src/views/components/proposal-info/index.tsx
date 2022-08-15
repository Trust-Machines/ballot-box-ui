import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import moment from 'moment';
import ThemedBox from '../../../components/themed-box';
import {H4} from '../../../components/text';
import useTranslation from '../../../hooks/use-translation';
import {ProposalWithSpace} from '../../../types';

const ProposalInfo = (props: { proposal: ProposalWithSpace }) => {
    const [t] = useTranslation();
    const {proposal} = props;

    return <ThemedBox>
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
            <Box>{proposal.space.strategy}</Box>
            <Box>{t('Start Date')}</Box>
            <Box>{moment(proposal.startDate).format('MMM Do YY, h:mm a')}</Box>
            <Box>{t('End Date')}</Box>
            <Box>{moment(proposal.endDate).format('MMM Do YY, h:mm a')}</Box>
            {proposal.startBlock && (
                <>
                    <Box>{t('Start block')}</Box>
                    <Box>{proposal.startBlock}</Box>
                </>
            )}
        </Box>

    </ThemedBox>
}

export default ProposalInfo;
