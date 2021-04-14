import React from 'react';
import ReactDOM from 'react-dom';

import AppContext from '../popup/AppContext';
import App from './App';

class EdgeTranslate extends HTMLElement {
  // wrapper: HTMLDivElement;
  // constructor() {
  //   super();

  //   this.attachShadow({ mode: 'open' });

  //   this.wrapper = document.createElement('div');
  //   const style = document.createElement('style');
  //   style.textContent = stitchesConfig.getCssString();

  //   this.shadowRoot?.append(style, this.wrapper);
  // }

  static get observedAttributes() {
    return ['text'];
  }

  onClose = () => {
    ReactDOM.unmountComponentAtNode(this);
  };

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'text': {
        ReactDOM.render(
          <AppContext>
            <App text={newValue} onClose={this.onClose} />
          </AppContext>,
          this
        );
      }
    }
  }
}

export default EdgeTranslate;
