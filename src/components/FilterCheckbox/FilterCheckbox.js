import './FilterCheckbox.css';

function FilterCheckbox(props) {
  function handleCheckboxChange() {
    props.handleCheckboxSwitch(!props.checkboxState);
  }

  return (
    <div className='filter-checkbox'>
      <label
        id='chk-label'
        className='filter-checkbox__label button-transparency'
        aria-label='фильтр короткометражных фильмов'
      >
        <input
          type='checkbox'
          className='filter-checkbox__checkbox-hidden'
          checked={props.checkboxState}
          onChange={handleCheckboxChange}
        />
        <span
          className='filter-checkbox__checkbox-custom'
          role='checkbox'
          aria-checked={props.checkboxState}
          tabIndex='0'
          aria-labelledby='chk-label'
        />
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
