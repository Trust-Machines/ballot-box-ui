import React, {useState} from 'react';
import {useAtom} from 'jotai';
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
import {H3} from '../../../components/text';
import ThemedBox from '../../../components/themed-box';
import useTranslation from '../../../hooks/use-translation';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useRequireAuth from '../../../hooks/use-require-auth';
import useToast from '../../../hooks/use-toast';
import {Proposal, Space} from '../../../types';
import {createProposal, updateProposal} from '../../../api/ballot-box';
import {authWindowStateAtom} from '../../../store';
import {toUnixTs, unixTsNow} from '../../../util';

type FormStep = 1 | 2;

interface Props {
    proposalId?: number,
    space: Space,
    onSuccess: (proposal: Proposal) => void,
    onChange?: (data: {
        field: 'title' | 'body' | 'discussionLink',
        value: string
    } | {
        field: 'choices',
        value: string[]
    } | {
        field: 'startDate' | 'endDate',
        value: Moment
    }) => void,
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
    const {proposalId, space, formDefault, onSuccess} = props;
    const requireAuthSignature = useRequireAuth();
    const [, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const [, showMessage] = useToast();
    const [authWindowState] = useAtom(authWindowStateAtom);
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

    const submit = async () => {
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

        const proposal = {
            title,
            body,
            discussionLink,
            startTime: toUnixTs(startDate.toDate().getTime()),
            endTime: toUnixTs(endDate.toDate().getTime()),
            choices
        };

        const auth = await requireAuthSignature();

        const promise = proposalId ? updateProposal(auth, proposalId, proposal) : createProposal(auth, space.id, proposal);

        setInProgress(true);
        promise.then(r => {
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
                       if (props.onChange) {
                           props.onChange({field: 'title', value: e.target.value});
                       }
                   }}/>
        <TextField sx={{mb: '20px'}} label={t('Description (optional)')}
                   inputProps={{maxLength: 14000, sx: {resize: 'vertical'}}} multiline rows={12}
                   fullWidth value={body} helperText={`${body.length}/14000`}
                   onChange={(e) => {
                       resetError();
                       setBody(e.target.value);
                       if (props.onChange) {
                           props.onChange({field: 'body', value: e.target.value});
                       }
                   }}/>
        <TextField label={t('Discussion (optional)')}
                   inputProps={{maxLength: 150}} placeholder="https://forum.stacks.org/proposal"
                   fullWidth autoComplete="off" value={discussionLink}
                   error={error === 'discussionLink'}
                   helperText={error === 'discussionLink' ? errorMessage : ' '}
                   onChange={(e) => {
                       resetError();
                       setDiscussionLink(e.target.value);
                       if (props.onChange) {
                           props.onChange({field: 'discussionLink', value: e.target.value});
                       }
                   }}/>
    </>;

    const step2 = <>
        <ThemedBox sx={{mb: '40px'}}>
            <H3 sx={{mb: '20px'}}>{t('Voting')}</H3>
            <ProposalChoices choices={choices} onChange={(choices) => {
                resetError();
                setChoices(choices);
                if (props.onChange) {
                    props.onChange({field: 'choices', value: choices});
                }
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
                                              helperText={!error && startDate.unix() < unixTsNow() ? 'Starts immediately, taking the current block number as the snapshot.' : (error === 'startDate' ? errorMessage : ' ')}/>
                        }}
                        label={t('Start')}
                        value={startDate}
                        onChange={(v) => {
                            resetError();
                            if (v) {
                                setStartDate(v);
                                if (props.onChange) {
                                    props.onChange({field: 'startDate', value: v});
                                }
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
                                if (props.onChange) {
                                    props.onChange({field: 'endDate', value: v});
                                }
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
                    return null
                    // return <Button fullWidth variant="outlined" sx={sx} color="info" onClick={preview}>Preview</Button>;
                case 2:
                    return <Button fullWidth variant="outlined" sx={sx} color="info" onClick={back}>Back</Button>;
            }
        }

        const secondButton = () => {
            switch (step) {
                case 1:
                    return <Button fullWidth variant="contained" onClick={next}
                                   disabled={inProgress || authWindowState}>{t('Continue')}</Button>;
                case 2:
                    return <Button fullWidth variant="contained" onClick={submit}
                                   disabled={inProgress || authWindowState}>{proposalId ? t('Update') : t('Publish')}</Button>;
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
