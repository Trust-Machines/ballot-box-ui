import React, {useState} from 'react';
import Joi from 'joi';
import moment, {Moment} from 'moment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

import ProposalChoices from './proposal-choices';
import AuthRequired from '../../../../components/auth-required';
import {H3} from '../../../../components/text';
import useTranslation from '../../../../hooks/use-translation';
import ThemedBox from '../../../../components/themed-box';
import useMediaBreakPoint from '../../../../hooks/use-media-break-point';
import useAuth from '../../../../hooks/use-auth';
import useToast from '../../../../hooks/use-toast';
import {Proposal, Space} from '../../../../types';
import {createProposal} from '../../../../api';

type FormStep = 1 | 2;

interface Props {
    space: Space,
    onSuccess: (proposal: Proposal) => void,
    formDefault: {
        title: string,
        body: string,
        discussionLink: string
        choices: string[],
        startDate: Moment,
        endDate: Moment
    }
}

const ProposalForm = (props: Props) => {
    const {space, formDefault, onSuccess} = props;
    const {auth} = useAuth();
    const [, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const [, showMessage] = useToast();
    const [step, setStep] = useState<FormStep>(1);
    const [title, setTitle] = useState(formDefault.title);
    const [body, setBody] = useState(formDefault.body);
    const [discussionLink, setDiscussionLink] = useState(formDefault.discussionLink);
    const [choices, setChoices] = useState<string[]>(formDefault.choices);
    const [startDate, setStartDate] = React.useState<Moment>(formDefault.startDate);
    const [endDate, setEndDate] = React.useState<Moment>(formDefault.endDate);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [inProgress, setInProgress] = useState(false);

    const resetError = () => {
        setError('');
        setErrorMessage('');
    }

    const validationSchema1 = Joi.object({
        title: Joi.string()
            .min(3)
            .max(100)
            .required()
            .trim(),
        body: Joi.string()
            .max(14000)
            .allow('', null)
            .required()
            .trim(),
        discussionLink: Joi.string().uri({scheme: 'https', allowRelative: false})
            .allow('', null)
            .max(150)
            .required(),
    }).messages({
        'string.uriCustomScheme': t('Link must be a valid uri with a scheme matching the https pattern')
    });

    const next = () => {
        const props = {
            title,
            body,
            discussionLink
        }
        const validation = validationSchema1.validate(props);

        if (validation.error) {
            setError(validation.error.details[0].path[0].toString() || '');
            setErrorMessage(validation.error.details[0].message);
            return;
        }

        setStep(2);
    }

    const back = () => {
        setStep(1);
    }

    const preview = () => {

    }

    const validationSchema2 = Joi.object({
        choices: Joi.array()
            .min(2)
            .max(5)
            .required()
            .items(Joi.string().min(1).max(15).trim().required()),
        startDate: Joi
            .date()
            .iso()
            .required(),
        endDate: Joi.date()
            .iso()
            .greater(Joi.ref('startDate'))
            .required(),
    });

    const canSubmit = () => {
        if (step !== 2) {
            return false;
        }

        const props = {
            choices,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }

        return !validationSchema2.validate(props).error;
    }

    const submit = () => {
        const props = {
            choices,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }

        const validation = validationSchema2.validate(props);

        if (validation.error) {
            setError(validation.error.details[0].path[0].toString() || '');
            setErrorMessage(validation.error.details[0].message);
            return;
        }

        setInProgress(true);
        createProposal(auth!, space.id, {
            title,
            body,
            discussionLink,
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            choices
        }).then(r => {
            onSuccess(r);
        }).catch(e => {
            if (e.apiMessage) {
                showMessage(t(e.apiMessage), 'error');
            }
        }).finally(() => {
            setInProgress(false);
        });
    }

    const step1 = <>
        <TextField label={t('Title')} inputProps={{maxLength: 100}}
                   fullWidth autoFocus autoComplete="off" value={title}
                   error={error === 'title'}
                   helperText={error === 'title' ? errorMessage : ' '}
                   onChange={(e) => {
                       resetError();
                       setTitle(e.target.value);
                   }}/>
        <TextField sx={{mb: '20px'}} label={t('Description (optional)')}
                   inputProps={{maxLength: 14000, sx: {resize: 'vertical'}}} multiline rows={12}
                   fullWidth value={body} helperText={`${body.length}/14000`}
                   onChange={(e) => {
                       resetError();
                       setBody(e.target.value);
                   }}/>
        <TextField label={t('Discussion (optional)')}
                   inputProps={{maxLength: 150}} placeholder="https://forum.stacks.org/proposal"
                   fullWidth autoComplete="off" value={discussionLink}
                   error={error === 'discussionLink'}
                   helperText={error === 'discussionLink' ? errorMessage : ' '}
                   onChange={(e) => {
                       resetError();
                       setDiscussionLink(e.target.value);
                   }}/>
    </>;

    const step2 = <>
        <ThemedBox sx={{mb: '40px'}}>
            <H3 sx={{mb: '20px'}}>{t('Voting')}</H3>
            <ProposalChoices choices={choices} onChange={(choices) => {
                resetError();
                setChoices(choices);
            }}/>
            <FormHelperText error>{error === 'choices' ? errorMessage : ' '}</FormHelperText>
        </ThemedBox>
        <ThemedBox>
            <H3 sx={{mb: '20px'}}>{t('Voting period')}</H3>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: '20px'}}>
                <Box sx={{width: '48%'}}>
                    <DateTimePicker
                        ampm={false}
                        minDateTime={moment()}
                        renderInput={(props) => {
                            return <TextField fullWidth {...props} error={error === 'startDate'}
                                              helperText={error === 'startDate' ? errorMessage : ' '}/>
                        }}
                        label={t('Start')}
                        value={startDate}
                        onChange={(v) => {
                            resetError();
                            if (v) {
                                setStartDate(v);
                            }
                        }}
                    />
                </Box>
                <Box sx={{width: '48%'}}>
                    <DateTimePicker
                        ampm={false}
                        minDateTime={moment()}
                        renderInput={(props) => {
                            return <TextField fullWidth {...props} error={error === 'endDate'}
                                              helperText={error === 'endDate' ? errorMessage : ' '}/>
                        }}
                        label={t('End')}
                        value={endDate}
                        onChange={(v) => {
                            resetError();
                            if (v) {
                                setEndDate(v);
                            }
                        }}
                    />
                </Box>
            </Box>
        </ThemedBox>
    </>;

    const formMenu = (() => {
        const firstButton = () => {
            const sx = {
                mb: isMd ? '12px' : null,
                mr: !isMd ? '12px' : null
            };

            switch (step) {
                case 1:
                    return <Button fullWidth variant="outlined" sx={sx} color="info" onClick={preview}>Preview</Button>;
                case 2:
                    return <Button fullWidth variant="outlined" sx={sx} color="info" onClick={back}>Back</Button>;
            }
        }

        const secondButton = () => {
            switch (step) {
                case 1:
                    return <Button fullWidth variant="contained" onClick={next}
                                   disabled={inProgress}>{t('Continue')}</Button>;
                case 2:
                    return <AuthRequired inactive={!canSubmit()}>
                        <Button fullWidth variant="contained" onClick={submit}
                                disabled={inProgress}>{t('Publish')}</Button>
                    </AuthRequired>;
            }
        }

        return <Box sx={{
            flexGrow: 0,
            flexShrink: 0,
            width: isMd ? '200px' : null,
            pl: isMd ? '20px' : null,
            mt: !isMd ? '20px' : null
        }}>
            <ThemedBox sx={{
                display: !isMd ? 'flex' : null,
            }}>
                {firstButton()}
                {secondButton()}
            </ThemedBox>
        </Box>
    })();

    return <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box sx={{display: 'flex', flexDirection: !isMd ? 'column' : null}}>
            <Box sx={{flexGrow: 1}}>
                {step === 1 && step1}
                {step === 2 && step2}
            </Box>
            {formMenu}
        </Box>
    </LocalizationProvider>;
}

export default ProposalForm;
