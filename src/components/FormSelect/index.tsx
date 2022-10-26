import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface FormSelectProps {
    value: string,
    label: string,
    onChange: (val: string) => void,
    disabled?: boolean,
    data: string[]
}

export const FormSelect = ({value, label, disabled, onChange, data}: FormSelectProps) => (
    <FormControl className='form-select' disabled={disabled} id={`${label}`}>
        <InputLabel>
            {label}
        </InputLabel>
        <Select value={value} label="Breed" labelId={`${label}`} onChange={(e) => onChange(e.target.value)}>
            {data && data.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
    </FormControl>
)