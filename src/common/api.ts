import axios from 'axios';
import { ERROR_API_CALL_FAILED } from './constants';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
    },
});

export const getResources = async (url: string, params = {}) => {
    const response = await instance.get(url, { params });
    if (response.status === 200) {
        return await response.data;
    } else if (response.status === 404) {
        return undefined;
    } else {
        throw new Error(ERROR_API_CALL_FAILED);
    }
};

/*export const postResource = (url: string, body = {}, params = {}) => {};

export const putResource = (url: string, body = {}, params = {}) => {};

export const deleteResource = (url: string, body = {}, params = {}) => {};*/
