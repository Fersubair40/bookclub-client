import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const toggle = () => setShowSidebar(!showSidebar);
  return (
    <>
      <Header toggle={toggle} show={showSidebar} />
      <div className={showSidebar ? "nav show-menu" : "nav"} id="navbar">
        <nav className="nav__container">
          <div>
            <a href="#" className="nav__link nav__logo">
              <i className="bx bxs-disc nav__icon"></i>
              <span className="nav__logo-name">BookClub</span>
            </a>

            <div className="nav__list">
              <div className="nav__items">
                <h3 className="nav__subtitle"></h3>

                <Link to="/home" className="nav__link active">
                  <i className="bx bx-home nav__icon"></i>
                  <span className="nav__name">Home</span>
                </Link>

                <div className="nav__dropdown">
                  <a href="#" className="nav__link">
                    <i className="bx bx-user nav__icon"></i>
                    <span className="nav__name">Category</span>
                    <i className="bx bx-chevron-down nav__icon nav__dropdown-icon"></i>
                  </a>

                  <div className="nav__dropdown-collapse">
                    <div className="nav__dropdown-content">
                      <Link
                        to="/category/fiction"
                        className="nav__dropdown-item"
                      >
                        Fiction
                      </Link>
                      {/* <a href="#" className="nav__dropdown-item">
                        NonFiction
                      </a>
                      <a href="#" className="nav__dropdown-item">
                        Children's Book
                      </a> */}
                    </div>
                  </div>
                </div>
                {/* 
                <a href="#" className="nav__link">
                  <i className="bx bx-message-rounded nav__icon"></i>
                  <span className="nav__name">Messages</span>
                </a> */}
              </div>

              <div className="nav__items">
                <h3 className="nav__subtitle">Menu</h3>

                <div className="nav__dropdown">
                  <a href="#" className="nav__link">
                    <i className="bx bx-bell nav__icon"></i>
                    <span className="nav__name">Notifications</span>
                    <i className="bx bx-chevron-down nav__icon nav__dropdown-icon"></i>
                  </a>

                  {/* <div className="nav__dropdown-collapse">
                    <div className="nav__dropdown-content">
                      <a href="#" className="nav__dropdown-item">
                        Blocked
                      </a>
                      <a href="#" className="nav__dropdown-item">
                        Silenced
                      </a>
                      <a href="#" className="nav__dropdown-item">
                        Publish
                      </a>
                      <a href="#" className="nav__dropdown-item">
                        Program
                      </a>
                    </div>
                  </div> */}
                </div>

                <a href="#" className="nav__link">
                  <i className="bx bx-compass nav__icon"></i>
                  <span className="nav__name">Explore</span>
                </a>
                {/* <a href="#" className="nav__link">
                  <i className="bx bx-bookmark nav__icon"></i>
                  <span className="nav__name">Saved</span>
                </a> */}
              </div>
            </div>
          </div>

          <a href="#" className="nav__link nav__logout">
            <i className="bx bx-log-out nav__icon"></i>
            <span className="nav__name">Log Out</span>
          </a>
        </nav>
      </div>
    </>
  );
}
