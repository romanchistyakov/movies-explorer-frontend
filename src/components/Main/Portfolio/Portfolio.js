import React from "react";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="porfolio__list">
        <li className="portfolio__entity">
          <p className="portfolio__text"><a href="https://romanchistyakov.github.io/how-to-learn" target="_blank" rel="noopener noreferrer" className="portfolio__arrow hover-link">Статичный сайт</a></p>
          <a href="https://romanchistyakov.github.io/how-to-learn" target="_blank" rel="noopener noreferrer" className="portfolio__arrow hover-link">↗</a>
          <div className="portfolio__border"></div>
        </li>
        <li className="portfolio__entity">
          <p className="portfolio__text"><a href="https://romanchistyakov.github.io/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__arrow hover-link">Адаптивный сайт</a></p>
          <a href="https://romanchistyakov.github.io/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__arrow hover-link">↗</a>
          <div className="portfolio__border"></div>
        </li>
        <li className="portfolio__entity">
          <p className="portfolio__text"><a href="https://github.com/romanchistyakov/react-mesto-api-full" target="_blank" rel="noopener noreferrer" className="portfolio__arrow hover-link">Одностраничное приложение</a></p>
          <a href="https://github.com/romanchistyakov/react-mesto-api-full" target="_blank" rel="noopener noreferrer" className="portfolio__arrow hover-link">↗</a>
        </li>
      </ul>
    </section>
  )
};

export default Portfolio;