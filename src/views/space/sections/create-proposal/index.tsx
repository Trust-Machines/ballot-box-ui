import React, {ChangeEvent, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import {Button} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {H2, H3, Muted} from '../../../../components/text';
import useTranslation from '../../../../hooks/use-translation';
import {Space} from '../../../../types';

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
                                   <Button size="small" color="secondary" onClick={() => {
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


const CreateProposal = (props: { space: Space }) => {
    const {space} = props;
    const [t] = useTranslation();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [discussionLink, setDiscussionLink] = useState('');
    const [startBlock, setStartBlock] = useState<number | ''>('');
    const [endBlock, setEndBlock] = useState<number | ''>('');
    const [choices, setChoices] = useState<string[]>(['For', 'Against', 'Abstain']);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentBlock, setCurrentBlock] = useState(0);

    const resetError = () => {
        setError('');
        setErrorMessage('');
    }

    /*
    useEffect(() => {
        const getHeight = () => {
            getBlockHeight().then(r => {
                const height = r[space.network];
                if (height) {
                    setCurrentBlock(height);
                }
            })
        }

        getHeight();
        let int = setInterval(() => {
            getHeight();
        }, 5000);

        return () => {
            clearInterval(int);
        };
    }, [space]);

    useEffect(() => {
        if (startBlock === '' && endBlock === '' && currentBlock) {
            setStartBlock(currentBlock + 10);
            setEndBlock(currentBlock + 50);
        }
    }, [currentBlock]);

    if (!currentBlock) {
        return null;
    }

    */

    return <>
        <H2>{t('New proposal')}</H2>

        <Box sx={{mb: '20px', maxWidth: '600px'}}>
            <TextField label={t('Title')} inputProps={{maxLength: 100}}
                       fullWidth autoFocus autoComplete="off" value={title}
                       error={error === 'title'}
                       helperText={error === 'title' ? errorMessage : ' '}
                       onChange={(e) => {
                           resetError();
                           setTitle(e.target.value);
                       }}/>
            <TextField sx={{mb: '20px'}} label={t('Description (optional)')}
                       inputProps={{maxLength: 14000}} multiline rows={16}
                       fullWidth value={body} helperText={`${body.length}/14000`}
                       onChange={(e) => {
                           resetError();
                           setBody(e.target.value);
                       }}/>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: '20px'}}>
                <Box sx={{width: '48%'}}>
                    <TextField type="number" label={t('Start Block')} inputProps={{maxLength: 100}}
                               fullWidth autoComplete="off" value={startBlock}
                               error={error === 'startBlock'}
                               helperText={error === 'startBlock' ? errorMessage : ' '}
                               onChange={(e) => {
                                   resetError();
                                   setStartBlock(Number(e.target.value));
                               }}/>
                    <FormHelperText>{t(`The latest block on ${space.network} is ${currentBlock || '--'}`)} </FormHelperText>
                </Box>
                <Box sx={{width: '48%'}}>
                    <TextField type="number" label={t('End Block')} inputProps={{maxLength: 100}}
                               fullWidth autoComplete="off" value={endBlock}
                               error={error === 'endBlock'}
                               helperText={error === 'endBlock' ? errorMessage : ' '}
                               onChange={(e) => {
                                   resetError();
                                   setEndBlock(Number(e.target.value));
                               }}/>
                </Box>
            </Box>
            <H3>{t('Voting')}</H3>
            <ProposalChoices choices={choices} onChange={(choices) => {
                setChoices(choices);
            }}/>
        </Box>
    </>;
}

export default CreateProposal;
