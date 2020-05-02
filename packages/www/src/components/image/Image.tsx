import React from 'react';

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Image: React.FC<Props> = ({ src, ...props }) => {
  const path = src?.slice(0, src.lastIndexOf('.'));

  return (
    <picture>
      <source type="image/webp" srcSet={`${path}.webp`} />
      <source type="image/png" srcSet={`${path}.png`} />
      <source type="image/jpg" srcSet={`${path}.jpg`} />
      <img src={`${path}.png`} alt="" {...props} />
    </picture>
  );
};

export default Image;
