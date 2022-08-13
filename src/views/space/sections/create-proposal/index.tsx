import React, {ChangeEvent, useEffect, useState} from 'react';
import Joi from 'joi';
import {useAtom} from 'jotai';
import moment, {Moment} from 'moment'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {useNavigate} from '@reach/router';

import {H2, H3, Muted} from '../../../../components/text';
import useTranslation from '../../../../hooks/use-translation';
import ThemedBox from '../../../../components/themed-box';
import useMediaBreakPoint from '../../../../hooks/use-media-break-point';
import {Space} from '../../../../types';
import {createProposal} from '../../../../api';
import AuthRequired from '../../../../components/auth-required';
import useAuth from '../../../../hooks/use-auth';
import {proposalsAtom} from '../../../../store';
import useToast from '../../../../hooks/use-toast';

const ProposalChoices = (props: { choices: string[], onChange: (choices: string[]) => void }) => {
    const [t] = useTranslation();
    const {choices, onChange} = props;

    const canDelete = choices.length > 1;
    const canAdd = choices.length < 15;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
        const newChoices = [...choices].map((x, i) => i === index ? e.target.value : x);
        onChange(newChoices);
    }

    const deleteChoice = (index: number) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        onChange(newChoices);
    }

    const addChoice = () => {
        const newChoices = [...choices, ''];
        onChange(newChoices);
    }

    return <>
        {choices.map((c, i) => {
            return <Box sx={{mb: '10px', display: 'flex', alignItems: 'center'}} key={i}>
                <TextField sx={{flexGrow: 1}} size="small" fullWidth value={c}
                           onChange={(e) => {
                               handleChange(e, i)
                           }}
                           InputProps={{
                               startAdornment: <InputAdornment
                                   position={'start'}><Muted>{t(`Choice ${i + 1}`)}</Muted></InputAdornment>,
                               endAdornment: canDelete ? <InputAdornment position={'end'}>
                                   <Button size="small" onClick={() => {
                                       deleteChoice(i)
                                   }}>
                                       <ClearIcon fontSize="small"/>
                                   </Button>
                               </InputAdornment> : null
                           }}
                />
                <Box sx={{flexGrow: 0, flexShrink: 0, width: '70px', display: 'flex', justifyContent: 'flex-end'}}>
                    {i === choices.length - 1 && (
                        <Button size="small" onClick={addChoice} disabled={!canAdd}><AddIcon/></Button>
                    )}
                </Box>
            </Box>
        })}
    </>;
}

const FormMenu = (props: {
    step: 1 | 2,
    onNext: () => void,
    onBack: () => void,
    onPreview: () => void,
    onExitPreview: () => void,
    onSubmit: () => void,
    canSubmit: () => boolean
}) => {
    const {step, onNext, onBack, onPreview, onExitPreview, onSubmit, canSubmit} = props;
    const [, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();

    const firstButton = () => {
        const sx = {
            mb: isMd ? '12px' : null,
            mr: !isMd ? '12px' : null
        };

        switch (step) {
            case 1:
                return <Button fullWidth variant="outlined" sx={sx} color="info" onClick={onPreview}>Preview</Button>;
            case 2:
                return <Button fullWidth variant="outlined" sx={sx} color="info" onClick={onBack}>Back</Button>;
        }
    }

    const secondButton = () => {
        switch (step) {
            case 1:
                return <Button fullWidth variant="contained" onClick={onNext}>{t('Continue')}</Button>;
            case 2:
                return <AuthRequired inactive={!canSubmit()}>
                    <Button fullWidth variant="contained" onClick={onSubmit}>{t('Publish')}</Button>
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
}


const CreateProposal = (props: { space: Space }) => {
    const {space} = props;

    const {auth} = useAuth();
    const [, isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const [, showMessage] = useToast();
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [discussionLink, setDiscussionLink] = useState('');
    const [choices, setChoices] = useState<string[]>(['For', 'Against', 'Abstain']);
    const [startDate, setStartDate] = React.useState<Moment>(moment().add(2, 'hour').set('minutes', 0).set('seconds', 0).set('millisecond', 0));
    const [endDate, setEndDate] = React.useState<Moment>(moment().add(2, 'hour').set('minutes', 0).set('seconds', 0).set('millisecond', 0).add(1, 'day'));
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [done, setDone] = useState(false);
    const [proposals, setProposals] = useAtom(proposalsAtom);

    useEffect(() => {
        if (done) {
            showMessage(t('Your new proposal created'), 'success');
            navigate(`/spaces/${space.id}`).then();
        }
    }, [done]);

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

    const exitPreview = () => {

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
            setProposals([...proposals, r]);
            setDone(true);
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
    </>

    return <LocalizationProvider dateAdapter={AdapterMoment}>
        <H2>{t('New proposal')}</H2>
        <Box sx={{display: 'flex', flexDirection: !isMd ? 'column' : null}}>
            <Box sx={{flexGrow: 1}}>
                {step === 1 && step1}
                {step === 2 && step2}
            </Box>
            <FormMenu step={step} onNext={next} onBack={back} onSubmit={submit} canSubmit={canSubmit}
                      onPreview={preview}
                      onExitPreview={exitPreview}/>
        </Box>
    </LocalizationProvider>;
}

export default CreateProposal;
