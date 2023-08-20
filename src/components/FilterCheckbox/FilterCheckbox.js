import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter-checkbox'>
      <label
        id='chk-label'
        className='filter-checkbox__label button-transparency'
        aria-label='фильтр короткометражных фильмов'
      >
        <input type='checkbox' className='filter-checkbox__checkbox-hidden' />
        <span
          className='filter-checkbox__checkbox-custom'
          role='checkbox'
          aria-checked='false'
          tabIndex='0'
          aria-labelledby='chk-label'
        />
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
