import './MoviesCard.css';
import React from 'react';

function MoviesCard(props) {
  const timeToStr = (min) =>
    `${Math.floor(min / 60) > 0 ? Math.floor(min / 60) + 'ч' : ''}${
      min % 60 > 0 ? (min % 60) + 'м' : ''
    }`;

  return (
    <article className='movies-card'>
      {props.drawSaved ? (
        <button
          type='button'
          onClick={() => {}}
          className='movies-card__delete-button button-transparency'
          aria-label='Поставить лайк'
        ></button>
      ) : (
        <button
          type='button'
          onClick={() => {}}
          className={`movies-card__like-button ${
            props.card.saved && 'movies-card__like-button_active'
          } button-transparency`}
          aria-label='Поставить лайк'
        ></button>
      )}
      <img
        src={props.card.link}
        onClick={() => {}}
        className='movies-card__item-image'
        alt={`Изображение ${props.card.name}`}
      />
      <div className='movies-card__item-info'>
        <div className='movies-card__like-div'>
          <h2 className='movies-card__item-title'>{props.card.name}</h2>
        </div>
        <p className='movies-card__duration'>{timeToStr(props.card.time)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
