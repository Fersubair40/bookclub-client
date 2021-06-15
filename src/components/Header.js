import React from "react";
import {Link} from 'react-router-dom'

export default function Header({ toggle, show }) {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <img src="assets/img/perfil.jpg" alt="" className="header__img" />

          <Link to="/" className="header__logo">
            BookClub
          </Link>

          <div className="header__search">
            <input type="search" placeholder="Search" className="header__input" />
            <i className="bx bx-search header__icon"></i>
          </div>

          <div className="header__toggle">
            <i className={show ? "bx bx-x" : "bx bx-menu"} onClick={toggle}></i>
          </div>
        </div>
      </header>
    </>
  );
}
