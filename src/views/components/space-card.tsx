import React from 'react';
import {useAtom} from 'jotai';
import Box from '@mui/material/Box';
import {Tooltip, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import {useParams} from '@reach/router';

import SetSpacePicture from './dialogs/space-set-picture';
import Link from '../../components/link';
import SpaceIcon from '../../components/space-icon';
import useModal from '../../hooks/use-modal';
import useTranslation from '../../hooks/use-translation';
import useStyles from '../../hooks/use-styles';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import {spaceAtom, userSpacesAtom} from '../../store';
import {Space} from '../../types';


const SpaceCard = (props: { space: Space }) => {
    const {space} = props;
    const theme = useTheme();
    const [, setSpace] = useAtom(spaceAtom);
    const [userSpaces, setUserSpaces] = useAtom(userSpacesAtom);
    const [, showModal] = useModal();
    const [t] = useTranslation();
    const params = useParams();
    const styles = useStyles();
    const [isSm] = useMediaBreakPoint();

    const spaceUpdated = (space: Space) => {
        setSpace(space);
        setUserSpaces([...userSpaces.map(s => s.id === space.id ? space : s)]);
    }

    const editable = userSpaces.find(x => x.id === space.id) !== undefined;
    const sections = [
        {label: t('Proposals'), href: `/spaces/${space.id}`, selected: !params.section},
        {
            label: t('New Proposal'),
            href: `/spaces/${space.id}/new-proposal`,
            selected: params.section === 'new-proposal'
        },
        {
            label: t('Settings'),
            href: `/spaces/${space.id}/edit`,
            selected: params.section === 'edit'
        }
    ];

    const links = [
        space.twitterHandle ? (
            <Link to={`https://twitter.com/${space.twitterHandle}`} external>
                <Tooltip title={`@${space.twitterHandle}`}><TwitterIcon fontSize="small"/></Tooltip>
            </Link>
        ) : null,
        space.githubHandle ? (
            <Link to={`https://github.com/${space.githubHandle}`} external>
                <Tooltip title={`@${space.githubHandle}`}><GitHubIcon fontSize="small"/></Tooltip>
            </Link>
        ) : null,
        space.websiteLink ? (
            <Link to={space.websiteLink} external>
                <Tooltip title={space.websiteLink}><LinkIcon fontSize="small"/></Tooltip>
            </Link>
        ) : null,
        space.termsLink ? (
            <Link to={space.termsLink} external>
                <Tooltip title={space.termsLink}><ArticleOutlinedIcon fontSize="small"/></Tooltip>
            </Link>
        ) : null
    ].filter(x => x !== null);

    return <>
        <Box sx={{
            border: `1px solid ${theme.palette.divider}`,
            padding: '16px',
            borderRadius: '12px',
            flexGrow: 0,
            flexShrink: 0,
            position: 'relative',
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
                        zIndex: 1,
                        backgroundColor: styles.menuBgColor,
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: '30px'
                    }}/>
                    {editable && (
                        <Tooltip placement="right" enterDelay={1000} title={t('Set space picture')}>
                            <Box sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2,
                                cursor: 'pointer',
                                borderRadius: '50%',
                                border: '1px solid transparent',
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
                }}>{space.name}</Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px'
                }}>
                    {links.map((x, i) => <Box key={i} sx={{
                        mr: i !== links.length - 1 ? '16px' : null
                    }}>{x}</Box>)}
                </Box>
                <Box sx={{
                    display: 'flex',
                    fontSize: !isSm ? '90%' : null
                }}>
                    {editable && sections.map((i, c) => {
                        return <Link key={i.href} to={i.href}
                                     sx={{
                                         borderBottom: `2px solid ${i.selected ? styles.linkColor : 'transparent'}`,
                                         fontWeight: 600,
                                         marginRight: c !== sections.length - 1 ? '12px' : null,
                                         ':hover': {
                                             borderColor: styles.linkHoverColor
                                         }
                                     }}>{i.label}</Link>
                    })}
                </Box>
            </Box>
        </Box>
    </>
}

export default SpaceCard;
