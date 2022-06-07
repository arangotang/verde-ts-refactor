import React, { Dispatch, SetStateAction } from "react";
import { Product } from "../App";
import HeaderCart from "./HeaderCart";

export interface CartProps {
  count: string;
  prodName: string;
  styleName: string;
  styleUrl: string;
  price: number;
  salePrice?: number;
  productID: number;
  size: string;
  skuId: string;
  idx: number;
}

interface Props {
  localCart: CartProps[];
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  showDrawer: boolean;
  deleteCartItem: (idx: number) => void;
  setCurProd: React.Dispatch<React.SetStateAction<Product>>;
}

export default function Header(props: Props) {
  const { localCart, setShowDrawer, showDrawer, deleteCartItem, setCurProd } =
    props;

  return (
    <header id="top">
      <span className="header--left">
        <img
          className="header--icon"
          src="./assets/verde_icon.png"
          alt="logo"
        />
        <h1 className="header--title">Verde</h1>
      </span>
      <HeaderCart
        localCart={localCart}
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        deleteCartItem={deleteCartItem}
        setCurProd={setCurProd}
      />
    </header>
  );
}
