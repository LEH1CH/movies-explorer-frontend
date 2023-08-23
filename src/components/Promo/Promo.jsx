import './Promo.css';
import pic from '../../images/landing-logo.svg';

function Promo(props) {
  return (
    <section className="promo" aria-label="Заглавный слайд проектной работы">
      <div className="promo__content">
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <div className='promo__pic'></div>
      </div>
    </section>
  );
}

export default Promo;