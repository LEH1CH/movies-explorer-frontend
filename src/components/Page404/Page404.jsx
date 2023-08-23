import './Page404.css';
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Page404(props) {
  const navigate = useNavigate();

  return (
    <main className="main">
      <section className="page404" aria-label="Страница не найдена">
        <div className="page404__content">
          <h1 className="page404__title">404</h1>
          <h2 className="page404__subtitle">Страница не найдена</h2>
          <button type="button" onClick={()=>navigate(-1)} className="page404__back-button button-transparency" aria-label="Вернуться назад">Назад</button>
        </div>
      </section>
    </main>
  );
}

export default Page404;