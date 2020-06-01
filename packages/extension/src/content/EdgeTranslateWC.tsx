import ReactDOM from 'react-dom';
import React from 'react';
import cx from 'classnames';
import root from 'react-shadow';

import styles from './styles.css';

import AppContext from '../popup/AppContext';
import App from './App';

const style = (
  <style>
    {`@import url('${chrome.extension.getURL('/dist/content/content.css')}');`}
  </style>
);

const Shadow: React.FC<{ shown?: boolean }> = ({ shown = false, children }) => {
  return (
    <root.div>
      <div
        className={cx(styles.shadowRoot, shown ? styles.shown : styles.hidden)}
      >
        {style}
        {children}
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
