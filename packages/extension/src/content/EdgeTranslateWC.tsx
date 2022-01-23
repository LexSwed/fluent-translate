import React from 'react';
import { stitchesConfig } from '@fxtrot/ui';
import ReactDOM from 'react-dom';

import { AppContext } from '../popup/AppContext';
import ContentApp from './ContentApp';

class EdgeTranslate extends HTMLElement {
  wrapper: HTMLDivElement;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('div');
    this.shadowRoot?.append(this.wrapper);
  }

  connectedCallback() {
    const styleElement = document.createElement('style');
    this.shadowRoot?.prepend(styleElement);
    (stitchesConfig as any).sheet.sheet = styleElement.sheet;
    (stitchesConfig as any).reset();
  }

  static get observedAttributes() {
    return ['text'];
  }

  onClose = () => {
    ReactDOM.unmountComponentAtNode(this.wrapper);
  };

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'text': {
        ReactDOM.render(
          <AppContext>
            <ContentApp text={newValue} onClose={this.onClose} />
          </AppContext>,
          this.wrapper
        );
      }
    }
  }
}

export default EdgeTranslate;
