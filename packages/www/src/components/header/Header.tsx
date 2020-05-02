import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="flex-center main-center header-wrap">
        <div className="flex-center logo-wrap">
          <img
            src="images/icon.svg"
            alt="Edge Translate logo"
            className="logo"
            aria-hidden="true"
          />
          <span className="logo-title">Edge Translate</span>
        </div>
        <ul className="links">
          <li className="link">
            <a href="https://lexswed.github.io/">Author</a>
          </li>
          <li className="link">
            <a href="https://github.com/LexSwed/edge-translate">Sources</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
