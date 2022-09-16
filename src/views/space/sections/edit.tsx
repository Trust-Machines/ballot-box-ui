import React, {useState} from 'react';
import Joi from 'joi';
import {useAtom} from 'jotai';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useNavigate} from '@reach/router';

import ThemedBox from '../../../components/themed-box';
import {H2} from '../../../components/text';
import DeleteSpace from '../../components/dialogs/space-delete';
import {spaceAtom, userSpacesAtom, authWindowStateAtom} from '../../../store';
import useRequireAuth from '../../../hooks/use-require-auth';
import useTranslation from '../../../hooks/use-translation';
import useToast from '../../../hooks/use-toast';
import useModal from '../../../hooks/use-modal';
import {updateSpace} from '../../../api/ballot-box';
import {Space} from '../../../types';


const SpaceEdit = (props: { space: Space }) => {
    const {space} = props;
    const [t] = useTranslation();
    const requireAuthSignature = useRequireAuth();
    const [, showMessage] = useToast();
    const [, showModal] = useModal();
    const [, setSpace] = useAtom(spaceAtom);
    const [authWindowState] = useAtom(authWindowStateAtom);
    const [userSpaces, setUserSpaces] = useAtom(userSpacesAtom);
    const navigate = useNavigate();
    const [name, setName] = useState(space.name);
    const [about, setAbout] = useState(space.about || '');
    const [websiteLink, setWebsiteLink] = useState(space.websiteLink || '');
    const [termsLink, setTermsLink] = useState(space.termsLink || '');
    const [twitterHandle, setTwitterHandle] = useState(space.twitterHandle || '');
    const [githubHandle, setGithubHandle] = useState(space.githubHandle || '');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [inProgress, setInProgress] = useState<boolean>(false);

    const validator = (fields: any) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .required()
                .trim()
                .messages({
                    'string.empty': t('Space name is not allowed to be empty'),
                    'string.min': t('Space name length must be at least 3 characters long')
                }),
            about: Joi.string()
                .allow('')
                .required()
                .trim(),
            websiteLink: Joi.string().uri({scheme: 'https', allowRelative: false})
                .allow('')
                .required(),
            termsLink: Joi.string().uri({scheme: 'https', allowRelative: false})
                .allow('')
                .required(),
            twitterHandle: Joi.string()
                .regex(/^[a-zA-Z0-9._-]*$/)
                .message(t('"twitterHandle" must only contain alpha-numeric chars, dot, dash and underscore'))
                .allow('')
                .min(3)
                .max(40)
                .required(),
            githubHandle: Joi.string()
                .regex(/^[a-zA-Z0-9._-]*$/)
                .message(t('"githubHandle" must only contain alpha-numeric chars, dot, dash and underscore'))
                .allow('')
                .min(3)
                .max(40)
                .required(),
        }).messages({
            'string.uriCustomScheme': t('Link must be a valid uri with a scheme matching the https pattern')
        })

        return schema.validate(fields);
    }

    const resetError = () => {
        setError('');
        setErrorMessage('');
    }

    const submit = async () => {
        const props = {
            name,
            about,
            websiteLink,
            termsLink,
            twitterHandle,
            githubHandle
        }
        const validation = validator(props);

        if (validation.error) {
            setError(validation.error.details[0].context?.key || '');
            setErrorMessage(validation.error.details[0].message);
            return;
        }

        const auth = await requireAuthSignature();

        setInProgress(true);
        updateSpace(auth, space.id, props).then(r => {
            setSpace(r);
            showMessage(t('Space updated'), 'success');
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
        }).finally(() => {
            setInProgress(false);
        });
    }

    const deleteClicked = () => {
        showModal({
            body: <DeleteSpace space={space} onSuccess={spaceDeleted}/>
        })
    }

    const spaceDeleted = () => {
        setUserSpaces(userSpaces.filter(x => x.id !== space.id));
        setSpace(null);
        showMessage(t('Space deleted'), 'info');
        navigate('/').then();
    }

    return <Box>
        <ThemedBox sx={{mb: '20px'}}>
            <TextField label={t('Space name')} inputProps={{maxLength: 30}}
                       fullWidth autoFocus autoComplete="off" value={name}
                       error={error === 'name'}
                       helperText={error === 'name' ? errorMessage : ' '}
                       onChange={(e) => {
                           resetError();
                           setName(e.target.value);
                       }}/>
            <Box sx={{mt: '12px'}}>
                <TextField label={t('About')} inputProps={{maxLength: 250}}
                           fullWidth autoComplete="off" value={about}
                           helperText={' '}
                           onChange={(e) => {
                               resetError();
                               setAbout(e.target.value);
                           }}/>
            </Box>
            <Box sx={{mt: '12px'}}>
                <TextField label={t('Website')} placeholder="https://superdao.com" inputProps={{maxLength: 150}}
                           fullWidth autoComplete="off" value={websiteLink}
                           error={error === 'websiteLink'}
                           helperText={error === 'websiteLink' ? errorMessage : ' '}
                           onChange={(e) => {
                               resetError();
                               setWebsiteLink(e.target.value);
                           }}/>
            </Box>
            <Box sx={{mt: '12px'}}>
                <TextField label={t('Terms')} placeholder="https://forum.superdao.com/terms"
                           inputProps={{maxLength: 150}}
                           fullWidth autoComplete="off" value={termsLink}
                           error={error === 'termsLink'}
                           helperText={error === 'termsLink' ? errorMessage : ' '}
                           onChange={(e) => {
                               resetError();
                               setTermsLink(e.target.value);
                           }}/>
            </Box>
            <Box sx={{mt: '12px'}}>
                <TextField label={t('Twitter')} placeholder="superdao"
                           inputProps={{maxLength: 40}}
                           fullWidth autoComplete="off" value={twitterHandle}
                           error={error === 'twitterHandle'}
                           helperText={error === 'twitterHandle' ? errorMessage : ' '}
                           onChange={(e) => {
                               resetError();
                               setTwitterHandle(e.target.value.replace('@', ''));
                           }}/>
            </Box>
            <Box sx={{mt: '12px'}}>
                <TextField label={t('Github')} placeholder="superdao_code"
                           inputProps={{maxLength: 40}}
                           fullWidth autoComplete="off" value={githubHandle}
                           error={error === 'githubHandle'}
                           helperText={error === 'githubHandle' ? errorMessage : ' '}
                           onChange={(e) => {
                               resetError();
                               setGithubHandle(e.target.value.replace('@', ''));
                           }}/>
            </Box>
            <Box sx={{mt: '12px', display: 'flex', justifyContent: 'center'}}>
                <Button disabled={inProgress || authWindowState} variant="contained"
                        onClick={submit}>{t('Update')}</Button>
            </Box>
        </ThemedBox>
        <H2>{t('Danger zone')}</H2>
        <ThemedBox>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{flexGrow: 1}}>
                    <Box sx={{mb: '10px', fontWeight: '600'}}>{t('Delete this space')}</Box>
                    <Box sx={{
                        fontSize: '90%'
                    }}>{t('Once you delete a space, there is no going back. Please be certain.')}</Box>
                </Box>
                <Box>
                    <Button variant="contained" onClick={deleteClicked} color="error">{t('Delete space')}</Button>
                </Box>
            </Box>
        </ThemedBox>
    </Box>
}

export default SpaceEdit;
