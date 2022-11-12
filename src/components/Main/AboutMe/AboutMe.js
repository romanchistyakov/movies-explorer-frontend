import React from "react";
import './AboutMe.css';
import photo from '../../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__border"></div>
      <div className="about-me__grid">
        <div className="about-me__container">
          <p className="about-me__name">Роман</p>
          <p className="about-me__profession">Фронтенд-разработчик, 39 лет</p>
          <p className="about-me__story">
            Я родился и живу в Калининграде, закончил факультет судостроения и энергетики КГТУ.
            Проработал по прошлой специальности более 10 лет.
            Я люблю слушать музыку, смотреть кино, а ещё увлекаюсь бегом.
            Фронтенд разработке учился на курсах "Яндекс.Практикума".
          </p>
          <a href="https://github.com/romanchistyakov" target="_blank" rel="noopener noreferrer" className="about-me__link hover-link">Github</a>
        </div>
        <img src={photo} alt="Фотография" className="about-me__photo" />
      </div>

    </section>
  )
};

export default AboutMe;