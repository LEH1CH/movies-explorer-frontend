import './SearchForm.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useValidation } from "../../hooks/useValidation";

function SearchForm(props) {

  const { queryVal = '' } = props;
  const { values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm } = useValidation();

  React.useEffect(()=>{
      resetForm({query: queryVal},{query:''}, false);
  },[]);

  function handleSearch(e) {
    e.preventDefault();
    props.handleSearch(values.query);
  }

  return (
    <section className="search-form" aria-label="Поиск фильмов">
      <div className="search-form__content">
        <form className="search-form__form" name="search-form-form" onSubmit={ handleSearch } >
          <fieldset className="search-form__fieldset">
            <input type="text" value={values.query ? values.query : "" } onChange={ handleChange } className="search-form__input" placeholder="Фильм" name="query" />
            <button type="submit" className="search-form__button button-transparency" name="search-form-button" />
          </fieldset>
          <FilterCheckbox 
            checkboxState={props.checkboxState}
            handleCheckboxSwitch={props.handleCheckboxSwitch}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;