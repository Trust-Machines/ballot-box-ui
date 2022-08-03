import React, {useState} from 'react';
import Joi from 'joi';
import {useAtom} from 'jotai';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';

import {spaceAtom, userSpacesAtom} from '../../../../store';

import AuthRequired from '../../../../components/auth-required';
import ThemedBox from '../../../../components/themed-box';
import useAuth from '../../../../hooks/use-auth';
import useTranslation from '../../../../hooks/use-translation';
import useToast from '../../../../hooks/use-toast';
import {updateSpace} from '../../../../api';
import {Space} from '../../../../types';


const SpaceEdit = (props: { space: Space }) => {
    const {space} = props;
    const [t] = useTranslation();
    const {auth} = useAuth();
    const [, showMessage] = useToast();
    const [, setSpace] = useAtom(spaceAtom);
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

    const submit = () => {
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

        setInProgress(true);
        updateSpace(auth!, space.id, props).then(r => {
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

    return <Box>
        <Box sx={{fontSize: '26px', fontWeight: '600', mb: '20px'}}>{t('Edit space')}</Box>
        <ThemedBox>
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
                               setTwitterHandle(e.target.value);
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
                               setGithubHandle(e.target.value);
                           }}/>
            </Box>
            <Box sx={{mt: '12px', display: 'flex', justifyContent: 'center'}}>
                <AuthRequired>
                    <Button disabled={inProgress} variant="contained" onClick={submit}>{t('Update')}</Button>
                </AuthRequired>
            </Box>
        </ThemedBox>
    </Box>
}

export default SpaceEdit;
