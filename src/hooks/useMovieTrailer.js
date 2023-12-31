import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailervideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer =  (movieId)=>{
    const dispatch = useDispatch();
    // fetch trailer video && Updating the store with trailer video data
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailervideo(trailer));
    }

    useEffect(() => {
        getMovieVideos();
    }, []);
}


export default useMovieTrailer;