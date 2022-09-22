import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDB} from "../interfaces/movieInterface";

interface MoviesState{
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ movies,setMovies ] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    });
    
    const getMovies = async() => {
        const nowPlayingPromise =  movieDB.get<MovieDB>('/now_playing');
        const popularPromise =  movieDB.get<MovieDB>('/popular');
        const topRatedPromise =  movieDB.get<MovieDB>('/top_rated');
        const upComingPromise =  movieDB.get<MovieDB>('/upcoming');

        const res = await Promise.all([
                                            nowPlayingPromise,
                                            popularPromise,
                                            topRatedPromise,
                                            upComingPromise
                                        ]);
        setMovies({
            nowPlaying: res[0].data.results,
            popular: res[1].data.results,
            topRated: res[2].data.results,
            upcoming: res[3].data.results
        });
        setIsLoading(false);
    }
    useEffect(()=> {
        getMovies();
      },[]);

    return {
        ...movies,
        isLoading
    }
}
