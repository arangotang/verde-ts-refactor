import React, { CSSProperties } from 'react';

interface Props {
  rating: number;
  color: string;
  size: string;
}
export default function CustomStars(props: Props) {
  const { rating, color, size } = props;
  return (
    <div
      className="custom-stars"
      style={
        {
          fontSize: size,
          '--rating': rating,
          '--color': color,
        } as CSSProperties
      }
    />
  );
}
