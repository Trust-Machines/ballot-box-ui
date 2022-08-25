import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import ThemedBox from '../../components/themed-box';
import {H3} from '../../components/text';
import useTranslation from '../../hooks/use-translation';
import {formatVotePower} from '../../helper';
import {ProposalWithSpace} from '../../types';
import {percentOf} from '../../util';
import useStyles from '../../hooks/use-styles';

const ProposalStats = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const total = proposal.voteStats.reduce((p, c) => p + c.power, 0);
    const {symbol} = proposal.space.strategyOptions;
    const {voteStats} = proposal;
    const {textTruncateStyles} = useStyles();

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
                        mr: '6px',
                        ...textTruncateStyles
                    }}>{s.choice}</Box>
                    <Box sx={{
                        width: '70px',
                        textAlign: 'right',
                        mr: '6px',
                        ...textTruncateStyles
                    }}>{`${formatVotePower(s.power)} ${symbol}`}</Box>
                    <Box sx={{width: '50px', textAlign: 'right',}}>{`${per.toFixed(2)}%`}</Box>
                </Box>
                <LinearProgress value={per} variant="determinate" sx={{borderRadius: '5px', height: '10px'}}/>
            </Box>;
        })}
    </ThemedBox>;
}

export default ProposalStats;
