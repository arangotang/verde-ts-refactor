import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CartProps } from "./Header";
import CartDrawer from "./CartDrawer";
import { Product } from "../App";

interface Props {
  localCart: CartProps[];
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  showDrawer: boolean;
  deleteCartItem: (idx: number) => void;
  setCurProd: React.Dispatch<React.SetStateAction<Product>>;
}
export default function HeaderCart(props: Props) {
  const { localCart, setShowDrawer, showDrawer, deleteCartItem, setCurProd } =
    props;
  return (
    <div>
      <FontAwesomeIcon
        icon={faCartShopping}
        color="white"
        style={{ fontSize: "24px" }}
        type="button"
        className="header--cart"
        onClick={() => setShowDrawer(true)}
      />
      {showDrawer && (
        <CartDrawer
          localCart={localCart}
          setShowDrawer={setShowDrawer}
          deleteCartItem={deleteCartItem}
          setCurProd={setCurProd}
        />
      )}
    </div>
  );
}
