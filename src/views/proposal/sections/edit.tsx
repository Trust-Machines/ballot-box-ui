import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';


import {ProposalWithSpace} from '../../../types';

import Link from '../../../components/link';
import useTranslation from '../../../hooks/use-translation';

const ProposalEdit = (props: { proposal: ProposalWithSpace }) => {
    const {proposal} = props;
    const [t] = useTranslation();

    return <>
        <Box sx={{mb: '20px'}}>
            <Link to={`/spaces/${proposal.spaceId}/proposals/${proposal.id}`} sx={{
                display: 'inline-flex',
                alignItems: 'center'
            }}><ArrowBackIcon fontSize="small" sx={{mr: '4px'}}/>{t('Back')}</Link>
        </Box>
    </>;
}

export default ProposalEdit;
