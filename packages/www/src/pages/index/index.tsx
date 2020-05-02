import React from 'react';

const Main: React.FC = () => {
  return (
    <main className="main-center flex-center flex-column">
      <h1 className="h1-main">
        Translator Extension for
        <a
          href="https://www.microsoft.com/edge"
          target="_blank"
          rel="noopener noreferrer"
          className="ms-edge"
        >
          <img
            src="images/edge-logo.svg"
            className="ms-edge-logo"
            aria-hidden="true"
            alt="Microsoft Edge browser logo"
          />
          Microsoft Edge Browser
        </a>
      </h1>
      <button
        className="flex-center install"
        disabled
        title="Not yet available"
      >
        <img
          src="images/ms-logo.svg"
          aria-hidden="true"
          className="ms-logo"
          alt="Microsoft Edge extension store logo"
        />
        <div>
          <div className="install-big-text">Install Extension</div>
          <span>from Microsoft Edge Addons</span>
        </div>
      </button>
    </main>
  );
};

export default Main;
