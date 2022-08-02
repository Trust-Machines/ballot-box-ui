import Box from '@mui/material/Box';
import {Tooltip, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

import SetSpacePicture from '../dialogs/set-picture';
import SpaceIcon from '../../../../components/space-icon';
import useSpace from '../../../../hooks/use-space';
import useUserData from '../../../../hooks/use-user-data';
import useMediaBreakPoint from '../../../../hooks/use-media-break-point';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';


const SpaceCard = () => {
    const theme = useTheme();
    const {space} = useSpace();
    const {userSpaces} = useUserData();
    const [isSm] = useMediaBreakPoint();
    const [, showModal] = useModal();
    const [t] = useTranslation();

    if (!space) {
        return null;
    }

    const editable = userSpaces.find(x => x.id === space.id) !== undefined;

    return <Box sx={{
        border: `1px solid ${theme.palette.divider}`,
        padding: '16px',
        borderRadius: '12px',
        maxWidth: isSm ? '200px' : null
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box sx={{
                position: 'relative',
                width: '80px',
                height: '80px',
                marginBottom: '12px'
            }}>
                <SpaceIcon space={space} sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}/>
                {editable && (
                    <Tooltip placement="right" enterDelay={1000} title={t('Set space picture')}>
                        <Box sx={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            cursor: 'pointer',
                            borderRadius: '50%',
                            'svg': {
                                display: 'none'
                            },
                            ':hover': {
                                background: '#000',
                                opacity: .9,
                                'svg': {
                                    display: 'block'
                                },
                            }
                        }} onClick={() => {
                            showModal({body: <SetSpacePicture space={space}/>});
                        }}>
                            <EditIcon sx={{color: grey['200']}}/>
                        </Box>
                    </Tooltip>
                )}
            </Box>

            <Box sx={{
                fontSize: '22px',
                fontWeight: '700',
            }}>{space.name}</Box>
        </Box>
    </Box>
}

export default SpaceCard;
