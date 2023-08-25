import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import React from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions.js"
import {
  FILMS_TO_SHOW_4_COLS,
  FILMS_TO_ADD_4_COLS,
  FILMS_TO_SHOW_3_COLS,
  FILMS_TO_ADD_3_COLS,
  FILMS_TO_SHOW_2_COLS,
  FILMS_TO_ADD_2_COLS,
  FILMS_TO_SHOW_1_COL,
  FILMS_TO_ADD_1_COL,
  MAX_WINDOW_WIDTH_3_COLS,
  MAX_WINDOW_WIDTH_2_COLS,
  MAX_WINDOW_WIDTH_1_COL
} from "../../utils/constants"

function MoviesCardList(props) {
  //Стейт сколько фильмов отображать
  const [numberOfFilmsToShow, setNumberOfFilmsToShow] = React.useState(12);
  
  //Стейт сколько фильмов добавлять
  const [numberOfFilmsToAdd, setNumberOfFilmsToAdd] = React.useState(0);
  
  //Ширина окна, определяемая хуком
  const { width } = useWindowDimensions();

  //Устанавливаем начальные значения параметров вывода карточек
  React.useEffect(()=>{
    if (width > MAX_WINDOW_WIDTH_3_COLS) {setNumberOfFilmsToShow(FILMS_TO_SHOW_4_COLS); setNumberOfFilmsToAdd(FILMS_TO_ADD_4_COLS);}
    else if (width > MAX_WINDOW_WIDTH_2_COLS) {setNumberOfFilmsToShow(FILMS_TO_SHOW_3_COLS); setNumberOfFilmsToAdd(FILMS_TO_ADD_3_COLS);}
    else if (width > MAX_WINDOW_WIDTH_1_COL) {setNumberOfFilmsToShow(FILMS_TO_SHOW_2_COLS); setNumberOfFilmsToAdd(FILMS_TO_ADD_2_COLS);}
    else {setNumberOfFilmsToShow(FILMS_TO_SHOW_1_COL); setNumberOfFilmsToAdd(FILMS_TO_ADD_1_COL);}
  },[]);

  //Устанавливаем значения параметров вывода карточек при изменении ширины окна
  React.useEffect(function () {
    if (width > MAX_WINDOW_WIDTH_3_COLS) {setNumberOfFilmsToShow(FILMS_TO_SHOW_4_COLS); setNumberOfFilmsToAdd(FILMS_TO_ADD_4_COLS);}
    else if (width > MAX_WINDOW_WIDTH_2_COLS) {setNumberOfFilmsToShow(FILMS_TO_SHOW_3_COLS); setNumberOfFilmsToAdd(FILMS_TO_ADD_3_COLS);}
    else if (width > MAX_WINDOW_WIDTH_1_COL) {setNumberOfFilmsToShow(FILMS_TO_SHOW_2_COLS); setNumberOfFilmsToAdd(FILMS_TO_ADD_2_COLS);}
    else {setNumberOfFilmsToShow(FILMS_TO_SHOW_1_COL); setNumberOfFilmsToAdd(FILMS_TO_ADD_1_COL);}
  }, [width]);

  return (
    <section className="movies-card-list" aria-label="Галерея фотографий">
      <div className="movies-card-list__content">
        <ul className="movies-card-list__items">
          {
              props.films.slice(0, props.drawSaved ? props.films.length : numberOfFilmsToShow).map((el) =>
                <MoviesCard
                  key = { el.movieId }
                  movie = { el }
                  handleLikeClick = { props.handleLikeClick }
                  handleDeleteClick = { props.handleDeleteClick }
                  drawSaved = { props.drawSaved }
                  fetching = { props.fetching }
                />)
          }
        </ul>
        {!props.drawSaved && <div className="movies-card-list__more">
          {
            props.films.length>numberOfFilmsToShow && <button 
              type="button" 
              onClick={()=>setNumberOfFilmsToShow(numberOfFilmsToShow+numberOfFilmsToAdd)} 
              className="movies-card-list__more-button button-transparency" 
              aria-label="Загрузить больше фильмов">
            Ещё
            </button>
          }
        </div>}
      </div>
    </section>
  );
}

export default MoviesCardList;