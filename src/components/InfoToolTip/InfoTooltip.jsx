import React from "react";
import granted from '../../images/granted.svg';
import denied from '../../images/denied.svg';
import './InfoToolTip.css'

function InfoTooltip(props) {

  return (
    <div className={`popup popup_transition ${ props.isOpen ? 'popup_opened' : '' }`} onMouseDown={props.onClose}>
      <div className="popup__form-container popup__form-container_type_infoTooltip" onMouseDown={ (e)=>{e.stopPropagation()} }>
          <img src={props.isOk ? granted : denied} className="popup__logo" alt={props.message} />
          <h2 className="popup__title popup__title_type_infoTooltip">{ props.message }</h2>
          <button type="button" onClick={props.onClose} className="popup__exit-button button-transparency" name="closeBtn"
            aria-label="Закрыть окно"></button>
        </div>
    </div>
  );
}

export default InfoTooltip;