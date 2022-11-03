import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getResources } from '../common/api';
import { Breed } from '../models/Breed';
import { ImageResponse } from '../models/Image';

const defaultValue: any = {};

export const CatContext = createContext(defaultValue);

export const CatProvider = ({ children }: any) => {
    const [breeds, setBreeds] = useState<Breed[] | []>([]);
    const [cats, setCats] = useState<ImageResponse | []>([]);
    const [selectedBreed, setSelectedBreed] = useState<Breed | {}>({});
    const [hasError, setHasError] = useState<boolean>(false);

    //Fetching all breeds
    useEffect(() => {
        getResources('breeds').then((data) => {
            setBreeds(data);
        });
    }, []);

    const state = {
        breed: { breeds, setBreeds, selectedBreed, setSelectedBreed },
        cat: { cats, setCats },
        alert: { hasError, setHasError },
    };

    return (
        <CatContext.Provider value={state}>
            <Collapse in={hasError}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setHasError(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Apologies but we could not load new cats for you at this
                    time! Miau!
                </Alert>
            </Collapse>

            {children}
        </CatContext.Provider>
    );
};

export default function useCat() {
    return useContext(CatContext);
}
