import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopuarMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    return (
        <div>
            <Header />
            {
                showGptSearch ? (<GptSearch />) :(
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>)
            }


            {/* {
                Main Video Conatiner
                    -VideoBackground
                    -VideoTitle
                Secondary Container
                    - Movie List * n
                        - Card * n
            } */}
        </div>
    )
}

export default Browse