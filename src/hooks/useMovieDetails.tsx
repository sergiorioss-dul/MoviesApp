import { useState, useEffect } from 'react';
import { MovieFull } from '../interfaces/movieInterface';
import movieDB from '../api/movieDB';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails {
    cast: Cast[];
    isLoading: boolean;
    movieFull?: MovieFull;
}
export const useMovieDetails = (movieId : number) => {
  
    const [ movie,useMovie] = useState<MovieDetails>({
        isLoading:true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async() => {

        const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
        const movieCreditsPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

        const [ movieDetailsResp, castPromiseResponse ] = await Promise.all([
            movieDetailsPromise,
            movieCreditsPromise
        ]);

        useMovie({
            isLoading:false,
            movieFull: movieDetailsResp.data,
            cast: castPromiseResponse.data.cast
        });
    }

    useEffect(()=>{
        getMovieDetails();
    },[])

    return {
        ...movie
    }

}
