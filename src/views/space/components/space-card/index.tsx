import Box from '@mui/material/Box';
import {Tooltip, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import {useParams} from '@reach/router'

import Link from '../../../../components/link';
import SetSpacePicture from '../dialogs/set-picture';
import SpaceIcon from '../../../../components/space-icon';
import useSpace from '../../../../hooks/use-space';
import useUserData from '../../../../hooks/use-user-data';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import {Space} from '../../../../types';


const SpaceCard = (props: { space: Space }) => {
    const {space} = props;
    const theme = useTheme();
    const {updateSpace} = useSpace();
    const {userSpaces, updateSpace: updateSpace2} = useUserData();
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const params = useParams();

    const spaceUpdated = (space: Space) => {
        updateSpace(space);
        updateSpace2(space);
    }

    const linkColor = theme.palette.mode === 'light' ? grey[800] : grey[200];
    const linkHoverColor = grey[500];
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
        flexGrow: 0,
        flexShrink: 0,
        position: 'relative',
    }}>
        {editable && <Box sx={{
            position: 'absolute',
            right: '12px',
            top: '12px'
        }}>
            <Link to={`/spaces/${space.id}/edit`}>
                <Tooltip title={t('Edit space')} enterDelay={1000}>
                    <EditIcon/>
                </Tooltip>
            </Link>
        </Box>}
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
            }}>
                {sections.map((i, c) => {
                    if (i.requiresOwner && !editable) {
                        return null;
                    }

                    return <Link key={i.href} to={i.href}
                                 sx={{
                                     borderBottom: i.selected ? `2px solid ${linkColor}` : null,
                                     fontWeight: 600,
                                     marginRight: c !== sections.length - 1 ? '12px' : null,
                                 }}>{i.label}</Link>
                })}
            </Box>
        </Box>
    </Box>
}

export default SpaceCard;
