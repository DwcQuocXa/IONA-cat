import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import useCat from '../context/cat.context';
import SelectField from '../components/SelectField';
import { getResources } from '../common/api';
import { PAGE_SIZE } from '../common/constants';
import MediaCard from '../components/MediaCard';

function Home() {
    const { breed, cat, alert } = useCat();
    const [page, setPage] = useState(1);
    const [showLoadMore, setShowLoadMore] = useState(false);

    const removeDuplicates = (array) => {
        return array.filter(
            (value, index, self) =>
                index ===
                self.findIndex((t) => t.id === value.id && t.url === value.url),
        );
    };

    //Fetching list of images for the selected breed
    useEffect(() => {
        if (breed.selectedBreed.id) {
            getResources('images/search', {
                page,
                limit: PAGE_SIZE,
                breed_id: breed.selectedBreed.id,
            })
                .then((cats) => {
                    if (page > 1) {
                        //Remove duplicates is necessary when the API return some same values in different PAGEs
                        const uniqueCats = removeDuplicates([
                            ...cat.cats,
                            ...cats,
                        ]);

                        //Disable Load More button in the end of images lists
                        if (uniqueCats.length === cat.cats.length) {
                            setShowLoadMore(false);
                        }
                        cat.setCats(uniqueCats);
                    } else {
                        cat.setCats(cats);
                        if(cats.length === PAGE_SIZE) {
                            setShowLoadMore(true);
                        }
                    }
                })
                .catch(() => {
                    alert.setHasError(true);
                });
        }
    }, [breed.selectedBreed, page]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                maxWidth: 1000,
                padding: '40px',
                margin: 'auto',
            }}
        >
            <Typography gutterBottom variant="h3" component="div">
                Cat Browser
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                Breeds
            </Typography>
            <SelectField
                label="Breeds"
                options={breed.breeds}
                value={breed.selectedBreed}
                setValue={breed.setSelectedBreed}
                setPage={setPage}
            />
            <div>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {cat.cats.map((cat) => (
                        <Grid item xs={4} sm={4} md={4} key={cat.id}>
                            <MediaCard image={cat.url} id={cat.id} />
                        </Grid>
                    ))}
                </Grid>
                {showLoadMore && (
                    <Button
                        variant="contained"
                        style={{ marginBottom: '10px', marginTop: '10px' }}
                        onClick={() => setPage(page + 1)}
                    >
                        Load More
                    </Button>
                )}
            </div>
        </Box>
    );
}

export default Home;
