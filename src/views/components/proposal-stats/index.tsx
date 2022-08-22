import {Box, LinearProgress} from '@mui/material';
import {ProposalWithSpace} from '../../../types';
import ThemedBox from '../../../components/themed-box';
import {H3} from '../../../components/text';
import useTranslation from '../../../hooks/use-translation';
import {formatVotePower} from '../../../helper';
import {percentOf} from '../../../util';

const ProposalStats = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const total = proposal.voteStats.reduce((p, c) => p + c.power, 0);
    const {symbol} = proposal.space.strategyOptions;
    const {voteStats} = proposal;
    const commonSx = {
        mr: '6px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    return <ThemedBox sx={{fontSize: '90%', fontWeight: '600'}}>
        <H3>{t('Results')}</H3>

        {voteStats.map((s, i) => {
            const per = total === 0 ? 0 : percentOf(s.power, total);
            return <Box key={s.choice} sx={{
                mb: i === voteStats.length - 1 ? null : '20px'
            }}>
                <Box sx={{mb: '6px', display: 'flex', alignItems: 'center'}}>
                    <Box sx={{
                        width: '114px',
                        flexGrow: 1,
                        ...commonSx
                    }}>{s.choice}</Box>
                    <Box sx={{
                        width: '70px',
                        textAlign: 'right',
                        ...commonSx
                    }}>{`${formatVotePower(s.power)} ${symbol}`}</Box>
                    <Box sx={{width: '50px', textAlign: 'right',}}>{`${per}%`}</Box>
                </Box>
                <LinearProgress value={per} variant="determinate" sx={{borderRadius: '5px', height: '10px'}}/>
            </Box>;
        })}
    </ThemedBox>;
}

export default ProposalStats;
