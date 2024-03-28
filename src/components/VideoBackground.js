import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';
import { TRAILER_VIDEO } from '../utils/constants';

const VideoBackground = ({movieId}) => {
    const trailerVideo = useSelector(store => store.movies?.trailerVideo)
    useMovieTrailer(movieId);
    return (
        <div>
            <iframe className='w-[100%] aspect-video' src={TRAILER_VIDEO + trailerVideo?.key + "?&autoplay=1&mute=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
    )
} 

export default VideoBackground


