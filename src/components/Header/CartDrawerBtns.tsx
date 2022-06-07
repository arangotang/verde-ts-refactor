import React from "react";

interface Props {
  cartTotal: number;
}
export default function CartDrawerBtns(props: Props) {
  const { cartTotal } = props;

  return (
    <button
      className="cart-drawer--btns checkout--btn"
      type="button"
      onClick={() => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
      }}
    >
      {`CHECKOUT - $${cartTotal}`}
    </button>
  );
}
