import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailervideo } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useMovieTrailer =  (movieId)=>{
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo)
    // fetch trailer video && Updating the store with trailer video data
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailervideo(trailer));
    }

    useEffect(() => {
        !trailerVideo && getMovieVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}


export default useMovieTrailer;