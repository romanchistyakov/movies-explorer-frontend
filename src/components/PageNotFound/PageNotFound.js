import React from "react";
import './PageNotFound.css';
import { Link } from "react-router-dom";

function PageNotFound() {

  return (
    <div className="pagenotfound">
      <h1 className="pagenotfound__title">404</h1>
      <p className="pagenotfound__subtitle">Страница не найдена</p>
      <Link to="/" className="pagenotfound__link hoover-link">Назад</Link>
    </div>
  )
};

export default PageNotFound;