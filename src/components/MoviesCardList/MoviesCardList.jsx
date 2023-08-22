import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import React, { useState, useEffect } from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions.js"

function MoviesCardList(props) {

  const [numberOfFilmsToShow, setNumberOfFilmsToShow] = useState(12);
  const [numberOfFilmsToAdd, setNumberOfFilmsToAdd] = useState(0);
  const { width } = useWindowDimensions();

  useEffect(()=>{
    if (width>800) {setNumberOfFilmsToShow(12); setNumberOfFilmsToAdd(12);}
    else if (width>500) {setNumberOfFilmsToShow(8); setNumberOfFilmsToAdd(8);}
    else {setNumberOfFilmsToShow(5); setNumberOfFilmsToAdd(5);}
  },[]);

  React.useEffect(function () {
    if (width>800) {setNumberOfFilmsToAdd(16);}
    else if (width>500) {setNumberOfFilmsToAdd(8);}
    else {setNumberOfFilmsToAdd(5);}
  }, [width]);


  return (
    <section className="movies-card-list" aria-label="Галерея фотографий">
      <div className="movies-card-list__content">
        <ul className="movies-card-list__items">
          {
            props.films.slice(0, numberOfFilmsToShow).map((el, i) =>
              <MoviesCard
                key={i}
                card={el}
                drawSaved={props.drawSaved}
              />)
          }
        </ul>
        <div className="movies-card-list__more">
          {props.films.length>numberOfFilmsToShow && <button type="button" onClick={()=>setNumberOfFilmsToShow(numberOfFilmsToShow+numberOfFilmsToAdd)} className="movies-card-list__more-button button-transparency" aria-label="Загрузить больше фильмов">Ещё</button>}
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;