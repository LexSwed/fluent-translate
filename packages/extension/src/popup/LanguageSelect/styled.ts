import { styled } from '@fxtrot/ui';

export const Select = styled('select', {
  'width': '120px',
  'br': '$md',
  'border': '1px solid transparent',
  'transition': '0.16s ease-in-out',
  'color': '$text',
  'height': '$8',
  'textSize': '$sm',
  'padding': '0 $7 0 $3',
  'overflow': 'hidden',
  'whiteSpace': 'nowrap',
  'textOverflow': 'ellipsis',
  'WebkitAppearance': 'none',
  'backgroundRepeat': 'no-repeat',
  'backgroundPosition': 'right 6px center',
  'outline': 'none',
  'bc': 'transparent',
  'backgroundImage':
    'url(\'data:image/svg+xml;utf-8,<svg width="10" height="10" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg"><path stroke-width="3" d="M11.3613 2.73633L11.8887 3.26367L6 9.15234L0.111328 3.26367L0.638672 2.73633L6 8.09766L11.3613 2.73633Z"></path></svg>\')',
  '&:hover': {
    bc: '$flatHover',
  },
  '&:focus': {
    bc: '$flatActive',
    borderColor: '$borderActive',
  },
  '& optgroup': {
    bc: '$surfaceStill',
  },

  '@media (prefers-color-scheme: dark)': {
    backgroundImage:
      'url(\'data:image/svg+xml;utf-8,<svg width="10" height="10" viewBox="0 0 16 12"  xmlns="http://www.w3.org/2000/svg"><path stroke="rgb(255,255,255)" stroke-width="2" d="M11.3613 2.73633L11.8887 3.26367L6 9.15234L0.111328 3.26367L0.638672 2.73633L6 8.09766L11.3613 2.73633Z"></path></svg>\')',
  },
});

export const Option = styled('option', {
  textSize: '$sm',
});
