import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

type MediaCardProps = {
    image: string;
    id: string;
};

export default function MediaCard({ image, id }: MediaCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={image} alt={id} />
            <CardActions>
                <Link to={`/${id}`} key={id} style={{ textDecoration: 'none' }}>
                    <Button size="large">View Detail</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
