import './AboutProject.css';

function AboutProject() {
  return (
    <section className="aboutproject" aria-label="Информация о дипломном проекте" id="aboutproject">
      <div className="aboutproject__content">
        <h2 className="aboutproject__title">О проекте</h2>
        <article className='aboutproject__desc-grid'>
          <h3 className='aboutproject__parts-title'>Дипломный проект включал 5 этапов</h3>
          <h3 className='aboutproject__time-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='aboutproject__parts-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className='aboutproject__time-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
        <ul className="aboutproject__schedule-grid">
          <li className="aboutproject__back-time">1 неделя</li>
          <li className="aboutproject__front-time">4 недели</li>
          <li className="aboutproject__back-caption">Back-end</li>
          <li className="aboutproject__front-caption">Front-end</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;