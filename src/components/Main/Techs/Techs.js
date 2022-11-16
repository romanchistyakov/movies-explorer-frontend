import React from "react";
import './Techs.css'

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__border"></div>
      <p className="techs__subtitle">7 технологий</p>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__technology">
        <li className="techs__entity">HTML</li>
        <li className="techs__entity">CSS</li>
        <li className="techs__entity">JS</li>
        <li className="techs__entity">React</li>
        <li className="techs__entity">Git</li>
        <li className="techs__entity">Express.js</li>
        <li className="techs__entity">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;