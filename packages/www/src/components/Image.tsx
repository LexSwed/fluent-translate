import React from 'react';

interface Props extends React.ComponentProps<'img'> {}

const Image: React.FC<Props> = ({ src, className, ...props }) => {
  const path = src?.slice(0, src.lastIndexOf('.'));

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${path}.webp`} />
      <source type="image/png" srcSet={`${path}.png`} />
      <source type="image/jpg" srcSet={`${path}.jpg`} />
      <img src={`${path}.png`} alt="" {...props} />
    </picture>
  );
};

export default Image;
