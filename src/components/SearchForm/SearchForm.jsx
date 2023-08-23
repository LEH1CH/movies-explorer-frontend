import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <section className="search-form" aria-label="Поиск фильмов">
      <div className="search-form__content">
        <form className="search-form__form" name="search-form-form">
          <fieldset className="search-form__fieldset">
            <input type="text" className="search-form__input" placeholder="Фильм" name="search-form-input" required />
            <button type="submit" className="search-form__button button-transparency" name="search-form-button"/>
          </fieldset>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;