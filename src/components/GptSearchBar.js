import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResults } from '../utils/GptSlice'

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang)
    const searchText = useRef(null);

    //search movie in TMDB
    const searchMovieTMDB = async (movie) => {
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS)
      const json = await data.json();
      return json.results;
    }

  const handleGptSearchClick = async ()=>{  
    console.log(searchText.current.value)

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " + searchText.current.value + ". only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Tiger 3, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices){
      console.error('Error: gptResults.choices is undefined or null');
      return
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    //"Andaz Apna Apna, Chupke Chupke, Gol Maal, Padosan, Jaane Bhi Do Yaaro"
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // it will give results in array ["Andaz Apna Apna, Chupke Chupke, Gol Maal, Padosan, Jaane Bhi Do Yaaro"]
    // for each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie)=> searchMovieTMDB(movie));
    //on this line i will get array of promises beacause it runs 5 times ["promise", "promise", ...]
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
  }


  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black grid grid-cols-12 rounded-md' onSubmit={(e)=>{e.preventDefault()}}>
            <input ref={searchText} type="text" className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder} />
            <button className='m-4 py-2 px-4 col-span-3 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar



