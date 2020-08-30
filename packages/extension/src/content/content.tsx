import '@webcomponents/webcomponentsjs';
import EdgeTranslate from './EdgeTranslateWC';

let element: HTMLElement;

function createElement() {
  if (!element) {
    // @ts-ignore
    customElements.define('edge-translate', EdgeTranslate);

    element = document.createElement('edge-translate');
    element.setAttribute(
      'style',
      'position: fixed; top: 8px; right: 8px; z-index: 999999;'
    );
    document.documentElement.appendChild(element);
  }
}

chrome.runtime.onMessage.addListener(({ text }) => {
  createElement();
  element.setAttribute('text', text);
});

document.addEventListener('mouseup', (event) => {
  const selection = window.getSelection();
  const text = selection?.toString();

  if (!text) {
    return;
  }

  const { x, y } = event;
});

function onMouseEnter(event) {}
