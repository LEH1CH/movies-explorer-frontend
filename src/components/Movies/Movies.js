import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <main className='main'>
      <SearchForm />
      <MoviesCardList drawSaved={false} films={props.listOfMovies} />
      {props.loading && <Preloader />}
    </main>
  );
}

export default Movies;
