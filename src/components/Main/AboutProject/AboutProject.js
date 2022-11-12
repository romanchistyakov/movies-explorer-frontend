import { React, forwardRef } from "react";
import './AboutProject.css'

const AboutProject = forwardRef((props, ref) => {
  return (
    <section className="about-project" ref={ref}>
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__border"></div>
      <div className="about-project__grid">
        <div className="about-project__container">
          <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__container">
          <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="about-project__timeline">
        <p className="about-project__timeline-first">1 неделя</p>
        <p className="about-project__timeline-second">4 недели</p>
        <p className="about-project__timeline-third">Back-end</p>
        <p className="about-project__timeline-fourth">Front-end</p>
      </div>
    </section>
  )
});

export default AboutProject;