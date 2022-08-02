import Box from '@mui/material/Box';
import {Tooltip, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import {Link, useParams} from '@reach/router'

import SetSpacePicture from '../dialogs/set-picture';
import SpaceIcon from '../../../../components/space-icon';
import useSpace from '../../../../hooks/use-space';
import useUserData from '../../../../hooks/use-user-data';
import useMediaBreakPoint from '../../../../hooks/use-media-break-point';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import {Space} from '../../../../types';


const SpaceCard = () => {
    const theme = useTheme();
    const {space, updateSpace} = useSpace();
    const {userSpaces, updateSpace: updateSpace2} = useUserData();
    const [isSm] = useMediaBreakPoint();
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const params = useParams();

    if (!space) {
        return null;
    }

    const spaceUpdated = (space: Space) => {
        updateSpace(space);
        updateSpace2(space);
    }

    const editable = userSpaces.find(x => x.id === space.id) !== undefined;
    const sections = [
        {label: t('Proposals'), href: `/spaces/${space.id}`, selected: !params.section},
        {
            label: t('New Proposal'),
            href: `/spaces/${space.id}/new-proposal`,
            selected: params.section === 'new-proposal',
            requiresOwner: true
        },
        {label: t('About'), href: `/spaces/${space.id}/about`, selected: params.section === 'about'},
    ];

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
                            showModal({body: <SetSpacePicture space={space} onSuccess={spaceUpdated}/>});
                        }}>
                            <EditIcon sx={{color: grey['200']}}/>
                        </Box>
                    </Tooltip>
                )}
            </Box>
            <Box sx={{
                fontSize: '22px',
                fontWeight: '700',
                mb: '20px',
            }}>{space.name}</Box>
            <Box sx={{
                display: 'flex',
                width: isSm ? '100%' : null,
                flexDirection: isSm ? 'column' : 'row'
            }}>
                {sections.map((i, c) => {
                    if (i.requiresOwner && !editable) {
                        return null;
                    }
                    const color = theme.palette.mode === 'light' ? grey[800] : grey[200];
                    const isLastItem = c === sections.length - 1;
                    return <Box key={i.href} component={Link} to={i.href}
                                sx={{
                                    color: color,
                                    borderLeft: i.selected && isSm ? `2px solid ${color}` : null,
                                    borderBottom: i.selected && !isSm ? `2px solid ${color}` : null,
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    padding: isSm ? '6px 12px' : null,
                                    marginBottom: isSm && !isLastItem ? '6px' : null,
                                    marginRight: !isSm && !isLastItem ? '12px' : null,
                                }}>{i.label}</Box>
                })}
            </Box>
        </Box>
    </Box>
}

export default SpaceCard;
