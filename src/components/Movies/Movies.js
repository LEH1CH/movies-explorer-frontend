import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {
  movieDataFormatConverter,
  searchMovies,
  updateSavedMovies,
  checkQuery,
} from '../../utils/fncLib';
import { SHORT } from '../../utils/constants';
import moviesApi from '../../utils/MoviesApi';

function Movies(props) {
  //Состояние чекбокса короткометражек
  const [filterCheckboxState, setFilterCheckboxState] = React.useState(() => {
    const search = localStorage.getItem('search');
    return search ? JSON.parse(search).chkbx : false;
  });
  //Состояние поля ввода запроса
  const [searchQuery, setSearchQuery] = React.useState(() => {
    const search = localStorage.getItem('search');
    return search ? JSON.parse(search).query : '';
  });
  //Состояние поля ввода запроса
  const [searchResult, setSearchResult] = React.useState(() => {
    const search = localStorage.getItem('search');
    return search ? JSON.parse(search).result : [];
  });
  //Настройки предыдущего поиска
  const [lastSearch, setLastSearch] = React.useState(() => {
    const search = localStorage.getItem('search');
    return search
      ? JSON.parse(search)
      : { query: '', chkbx: false, result: [] };
  });
  //Список фильмов
  const [moviesData, setMoviesData] = React.useState(() => {
    const movies = localStorage.getItem('movies');
    return movies ? JSON.parse(movies) : [];
  });
  //Идёт ли загрузка
  const [isLoading, setIsLoading] = React.useState(false);

  //При изменении параметров последнего поиска после получения результата поиска они сохраняются в localstorage
  React.useEffect(() => {
    localStorage.setItem('search', JSON.stringify(lastSearch));
  }, [lastSearch]);

  //При изменении результатов поиска обновляются параметры последнего поиска
  React.useEffect(() => {
    setLastSearch({
      query: searchQuery,
      chkbx: filterCheckboxState,
      result: searchResult,
    });
  }, [searchResult]);

  //Первый поиск: получаем фильмы -> преобразуем формат -> сохраняем массив в localstorage
  //-> сохраняем список в стейте -> вызываем функцию поиска и результат заносим в стейт с результатами
  function handleFirstSearch() {
    moviesApi.getInitialMovies().then((data) => {
      const convertedArray = data.map((el) => movieDataFormatConverter(el));
      localStorage.setItem('movies', JSON.stringify(convertedArray));
      setMoviesData(convertedArray);
      handleSearch(convertedArray);
    });
  }

  //производит установку чекбокса в состояние state и сохраняет данные в последнем поиске
  function handleFilterCheckboxSwitch(newState) {
    setFilterCheckboxState(newState);
    setLastSearch({ ...lastSearch, chkbx: newState });
  }

  //при изменении списка сохранённых фильмов обновляет выдачу
  React.useEffect(
    function () {
      setSearchResult(updateSavedMovies(searchResult, props.savedMovies));
    },
    [props.savedMovies]
  );

  //при изменении строки запроса, если она не пустая, то
  //если фильмы не загружены -> делает первый поиск
  //если фильмы загружены -> делает обычный поиск
  React.useEffect(
    function () {
      if (searchQuery) {
        moviesData.length ? handleSearch(moviesData) : handleFirstSearch();
      }
    },
    [searchQuery, moviesData]
  );

  //обработчик сабмита в форме поиска
  function handleSearchClick(queryString) {
    if (checkQuery(queryString) && queryString !== searchQuery) {
      setIsLoading(true);
      setSearchQuery(queryString);
    } else {
      props.showInfoTooltip('Нужно ввести ключевое слово', false);
    }
  }

  //Обычный поиск: ищем фильмы -> обновляем сохранённые фильмы в результате выдачи
  function handleSearch(moviesArray) {
    const result = searchMovies(moviesArray, searchQuery);
    setSearchResult(updateSavedMovies(result, props.savedMovies));
    setIsLoading(false);
  }

  return (
    <main className='main'>
      <SearchForm
        handleSearch={handleSearchClick}
        checkboxState={filterCheckboxState}
        handleCheckboxSwitch={handleFilterCheckboxSwitch}
        queryVal={searchQuery}
      />
      <div className='movies'>
        {isLoading ? (
          <Preloader />
        ) : !searchResult.length ? (
          !!moviesData.length && (
            <h2 className='movies__nothingFound'>Ничего не найдено</h2>
          )
        ) : (
          <MoviesCardList
            drawSaved={false}
            films={
              filterCheckboxState
                ? searchResult.filter((el) => el.duration < SHORT)
                : searchResult
            }
            handleLikeClick={props.handleLikeClick}
            fetching={props.fetching}
          />
        )}
      </div>
    </main>
  );
}

export default Movies;
