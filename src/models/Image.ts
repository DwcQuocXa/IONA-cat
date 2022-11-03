import { Breed } from './Breed';

export interface Image {
    id: string;
    url: string;
    width: number;
    height: number;
}

export interface ImageResponse extends Image {
    breeds: Breed[];
}
