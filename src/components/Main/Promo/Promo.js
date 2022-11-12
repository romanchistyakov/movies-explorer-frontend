import React from "react";
import './Promo.css'
import promoLogo from '../../../images/landing-logo.svg'

function Promo({clickAbout}) {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента&nbsp;факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <img src={promoLogo} alt="Иконка" className="promo__logo" />
      <button className="promo__button" onClick={clickAbout}>Узнать больше</button>
    </section>
  )
}

export default Promo;