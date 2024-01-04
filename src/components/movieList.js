import React from 'react'
import MovieCard from './MovieCard'
const movieList = ({ title, movies }) => {
  console.log(movies);
  return (
    <div>
      <div className='px-6'>
        <h1 className='text-3xl py-4 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll'>
          <div className='flex'>
            {movies?.map(movie => <MovieCard key={movie.id} posterPath={movie.poster_path} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default movieList