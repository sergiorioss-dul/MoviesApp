import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'efa5bd99fafe2512fa3fa3ec237e2474',
        language: 'es-ES'
    }
});

export default movieDB;