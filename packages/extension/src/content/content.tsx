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

  let parent = selection?.getRangeAt(0).commonAncestorContainer;

  if (parent?.nodeType === 3) {
    parent = parent.parentNode as Node;
  }

  if (!parent) {
    return;
  }

  console.log(parent);
  console.log(selection?.focusOffset, selection?.anchorOffset);

  // document.addEventListener('mouseenter', onMouseEnter)
  // document.addEventListener('mouseleave', onMouseLeave)
});

function onMouseEnter(event) {}
