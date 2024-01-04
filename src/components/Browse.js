import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopuarMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    return (
        <div>
            <Header/>
            <MainContainer />
            <SecondaryContainer />
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