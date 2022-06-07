import React from 'react';

interface Props {
  price: number;
  salePrice?: number;
  fontSize?: number | boolean;
}

export default function Price(props: Props) {
  const { price, salePrice = 0, fontSize = false } = props;

  return (
    <span
      style={{
        display: 'flex',
        gap: '0.4rem',
        fontSize: fontSize === false ? '18px' : `${fontSize.toString()}px`,
        fontFamily: 'EB Garamond, serif',
        margin: '1rem 0',
      }}
    >
      {salePrice === 0 || salePrice === price ? (
        <p style={{ margin: 0 }}>${price}</p>
      ) : (
        <>
          <p
            style={{
              textDecoration: 'line-through',
              margin: 0,
              color: 'grey',
            }}
          >
            ${price}
          </p>
          <p style={{ margin: 0 }}>${salePrice}</p>
        </>
      )}
    </span>
  );
}
