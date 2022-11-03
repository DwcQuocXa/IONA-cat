import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CircularProgress } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { getResources } from '../common/api';
import useCat from "../context/cat.context";

function SingleCat() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { alert } = useCat();
    let breed;
    const [image, setImage] = useState();

    //Fetching image detail
    useEffect(() => {
        getResources(`images/${id}`).then((cat) => {
            setImage(cat);
        }).catch(() => {
            alert.setHasError(true);
        });
    }, [id]);

    if (image) {
        breed = image.breeds[0];
    }

    return !image ? (
        <Box sx={{ margin: 'auto' }}>
            <CircularProgress />
        </Box>
    ) : (
        <Box sx={{ maxWidth: 1000, margin: 'auto' }}>
            <Button
                variant="contained"
                style={{ marginBottom: '10px', marginTop: '10px' }}
                onClick={() => navigate('/')}
            >
                Back
            </Button>

            <Card>
                <CardMedia
                    component="img"
                    image={image.url}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {breed.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Origin: {breed.origin}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {breed.temperament}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {breed.description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default SingleCat;
