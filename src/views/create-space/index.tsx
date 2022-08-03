import React, {useState} from 'react'
import {RouteComponentProps} from '@reach/router';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Joi, {ValidationResult} from 'joi';

import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';
import AppContent from '../../layout/app-content';
import useTranslation from '../../hooks/use-translation';
import ThemedBox from '../../components/themed-box';


const CreateSpace = (_: RouteComponentProps) => {
    return null;
    /*
    const [t] = useTranslation();

    const validator = (fields: any) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .required()
                .trim()
                .messages({
                    'string.empty': 'Space name is not allowed to be empty',
                    'string.min': 'Space name length must be at least 3 characters long'
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
                .message('"twitterHandle" must only contain alpha-numeric chars, dot, dash and underscore')
                .allow('')
                .min(3)
                .max(40)
                .required(),
            githubHandle: Joi.string()
                .regex(/^[a-zA-Z0-9._-]*$/)
                .message('"githubHandle" must only contain alpha-numeric chars, dot, dash and underscore')
                .allow('')
                .min(3)
                .max(40)
                .required(),
        }).messages({
            'string.uriCustomScheme': 'Link must be a valid uri with a scheme matching the https pattern'
        })

        return schema.validate(fields);
    }

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [termsLink, setTermsLink] = useState('');
    const [twitterHandle, setTwitterHandle] = useState('');
    const [githubHandle, setGithubHandle] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const resetError = () => {
        setError('');
        setErrorMessage('');
    }

    const submit = () => {
        const validation = validator({
            name,
            about,
            websiteLink,
            termsLink,
            twitterHandle,
            githubHandle
        });

        if (validation.error) {
            setError(validation.error.details[0].context?.key || '');
            setErrorMessage(validation.error.details[0].message);
        }

        console.log(validation)
    }

    return <>
        <Helmet><title>{t('Create a space')}</title></Helmet>
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                <Box sx={{fontSize: '26px', fontWeight: '600', mb: '20px'}}>{t('Create a space')}</Box>
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
                        <Button variant="contained" onClick={submit}>{t('Create')}</Button>
                    </Box>
                </ThemedBox>
            </AppContent>
        </AppWrapper>
    </>

     */
}


export default CreateSpace;
