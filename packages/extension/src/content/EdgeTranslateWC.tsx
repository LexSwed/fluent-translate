import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import root from 'react-shadow';

import styles from './styles.css';

import AppContext from '../popup/AppContext';
import App from './App';

const Shadow: React.FC<{ shown?: boolean }> = ({ shown = false, children }) => {
  const [cssLoaded, setLoaded] = useState(false);
  return (
    <root.div>
      <link
        rel="stylesheet"
        href={chrome.extension.getURL('/dist/content/content.css')}
        onLoad={() => setLoaded(true)}
      />
      <div
        className={cx(styles.shadowRoot, shown ? styles.shown : styles.hidden)}
      >
        {cssLoaded && children}
      </div>
    </root.div>
  );
};

class EdgeTranslate extends HTMLElement {
  static get observedAttributes() {
    return ['text'];
  }

  onClose = () => {
    ReactDOM.render(<Shadow />, this);
  };

  connectedCallback() {
    ReactDOM.render(<Shadow />, this);
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'text': {
        ReactDOM.render(
          <Shadow shown>
            <AppContext>
              <App text={newValue} onClose={this.onClose} />
            </AppContext>
          </Shadow>,
          this
        );
      }
    }
  }
}

export default EdgeTranslate;
