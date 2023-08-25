import React from "react";
import './InfoToolTip.css'

function InfoTooltip(props) {

  const {isOk, isOpen, onClose, message} = props;

  // Обработчик закрытия по нажатию Esc
  React.useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [isOpen, onClose])

  return (
    <div className={`popup popup_transition ${ isOpen ? 'popup_opened' : '' }`} onMouseDown={ onClose } >
      <div className="popup__form-container popup__form-container_type_infoTooltip" onMouseDown={ (e)=>{e.stopPropagation()} } >
          <span className={`popup__logo ${!isOk ? "popup__logo_type_no" : "popup__logo_type_ok"}`}></span>
          <h2 className="popup__title popup__title_type_infoTooltip">{ message }</h2>
          <button type="button" onClick={onClose} className="popup__exit-button button-transparency" name="closeBtn"
            aria-label="Закрыть окно"></button>
        </div>
    </div>
  );
}

export default InfoTooltip;