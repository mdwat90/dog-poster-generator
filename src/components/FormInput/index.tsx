import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';

interface FormInputProps {
    value: string,
    label: string,
    onChange: (val: string) => void,
}

export const FormInput = ({value, label, onChange}: FormInputProps) => (
    <FormControl className='form-input'>
        <InputLabel>
            {label}
        </InputLabel>
        <Input type='number' value={value} onChange={(e) => onChange(e.target.value)} />
    </FormControl>
)