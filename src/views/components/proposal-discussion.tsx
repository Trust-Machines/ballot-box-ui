import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';

import {H3, H5} from '../../components/text'
import ThemedBox from '../../components/themed-box';
import Link from '../../components/link';
import useTranslation from '../../hooks/use-translation';
import {ProposalWithSpace} from '../../types';
import {getLinkData, IframelyLinkData} from '../../api/iframely';


const ProposalDiscussion = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const [t] = useTranslation();
    const [linkData, setLinkData] = useState<IframelyLinkData | null>(null);

    useEffect(() => {
        if (!proposal.discussionLink) {
            return;
        }

        getLinkData(proposal.discussionLink).then(r => {
            if (r) {
                setLinkData({...r});
            }
        })
    }, []);

    if (!proposal.discussionLink) {
        return null;
    }

    if (!linkData) {
        return <Box sx={{mb: '40px'}}>
            <H3>{t('Discussion')}</H3>
            <Link to={proposal.discussionLink} external={true}>{proposal.discussionLink}</Link>
        </Box>
    }

    return <Box sx={{mb: '40px'}}>
        <H3>{t('Discussion')}</H3>
        <Link to={proposal.discussionLink} external={true}>
            <ThemedBox sx={{
                display: 'flex'
            }}>
                {linkData.thumbnail && (
                    <Box component="img" src={linkData.thumbnail} sx={{width: '60px', maxHeight: '60px', mr: '10px'}}/>
                )}
                <Box sx={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    <H5>{linkData.title}</H5>
                    <Box>{linkData.description}</Box>
                </Box>
            </ThemedBox>
        </Link>
    </Box>
}

export default ProposalDiscussion;
