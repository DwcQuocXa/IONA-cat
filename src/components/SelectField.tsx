import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Breed } from '../models/Breed';

type SelectFieldProps = {
    label: string;
    options: Breed[];
    value: Breed;
    setValue: (args: Breed) => void;
    setPage: (args: number) => void;
};

export default function SelectField({
    label,
    options,
    value,
    setValue,
    setPage,
}: SelectFieldProps) {
    const selectedValueId = value.id || '';

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = options.find(
            (breed: Breed) => breed.id === event.target.value,
        );
        if (selectedValue) {
            setPage(1);
            setValue(selectedValue);
        }
    };

    return (
        <Box
            sx={{
                minWidth: 120,
                maxWidth: 200,
                marginBottom: '20px',
                marginTop: '20px',
            }}
        >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValueId}
                    label={label}
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
