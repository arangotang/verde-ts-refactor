import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Product } from "../App";
import CartDrawerBtns from "./CartDrawerBtns";
import CartDrawerItem from "./CartDrawerItem";
import { CartProps } from "./Header";

interface Props {
  localCart: CartProps[];
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  deleteCartItem: (idx: number) => void;
  setCurProd: React.Dispatch<React.SetStateAction<Product>>;
}
export default function CartDrawer(props: Props) {
  const [cartTotal, setCartTotal] = useState<number>(0);
  const { localCart, setShowDrawer, deleteCartItem, setCurProd } = props;

  const closeDrawer = (): void => {
    setShowDrawer(false);
  };

  const cartElements = localCart.map((item) => (
    <CartDrawerItem
      count={item.count}
      prodName={item.prodName}
      styleName={item.styleName}
      styleUrl={item.styleUrl}
      price={item.price}
      salePrice={item.salePrice}
      size={item.size}
      idx={item.idx}
      closeDrawer={closeDrawer}
      productID={item.productID}
      deleteCartItem={deleteCartItem}
      setCurProd={setCurProd}
      key={nanoid()}
    />
  ));

  useEffect(() => {
    let newCartTotal = 0;
    for (let i = 0; i < localCart.length; i += 1) {
      newCartTotal += Number(localCart[i].price) * Number(localCart[i].count);
    }
    setCartTotal(newCartTotal);
  }, [localCart]);

  return (
    <div className="drawer--container">
      <div
        className="drawer-window fade-in"
        onClick={closeDrawer}
        onKeyDown={closeDrawer}
        role="button"
        tabIndex={0}
        aria-label="transparent div"
      />
      <div className="header--cart-drawer slide-in">
        <div style={{ overflowY: "scroll" }}>
          <h3 className="cart-drawer--header">
            {cartElements.length ? "Your Cart" : "Your Cart Is Empty"}
          </h3>
          {cartElements}
        </div>
        <FontAwesomeIcon
          icon={faXmark}
          color="black"
          style={{ fontSize: "24px" }}
          type="button"
          onClick={closeDrawer}
          className="cart-drawer-exit"
        />
        <CartDrawerBtns cartTotal={cartTotal} />
      </div>
    </div>
  );
}
