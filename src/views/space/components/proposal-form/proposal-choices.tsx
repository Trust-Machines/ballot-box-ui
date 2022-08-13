import React, {ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

import {Muted} from '../../../../components/text';
import useTranslation from '../../../../hooks/use-translation';

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

export default ProposalChoices;
