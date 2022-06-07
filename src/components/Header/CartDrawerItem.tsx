import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "axios";
import { Product } from "../App";
import { CartProps } from "./Header";
import config from "../../config/config";

interface Props extends Omit<CartProps, "skuId"> {
  closeDrawer: () => void;
  deleteCartItem: (idx: number) => void;
  setCurProd: React.Dispatch<React.SetStateAction<Product>>;
}
export default function CartDrawerItem(props: Props) {
  const {
    count,
    prodName,
    styleName,
    styleUrl,
    price,
    salePrice,
    productID,
    size,
    idx,
    deleteCartItem,
    setCurProd,
    closeDrawer,
  } = props;

  let displayPrice = price;
  if (salePrice) {
    displayPrice = salePrice;
  }

  const deleteSelf = (): void => {
    deleteCartItem(idx);
  };

  const changeToThisProduct = () => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productID}`,
        {
          headers: { Authorization: config.TOKEN },
        }
      )
      .then(({ data }) => {
        setCurProd(data);
        closeDrawer();
      });
  };

  return (
    <div className="cart-drawer--item-container">
      <button
        type="button"
        onClick={changeToThisProduct}
        className="hover-pointer cart-item-btn"
      >
        <img src={styleUrl} className="cart-item-img" alt="" />
      </button>
      <div className="cart-drawer--item">
        <b>{prodName}</b>
        <p>{styleName}</p>
        <p>{`Size ${size}`}</p>
        <span>
          <p>{`Quantity ${count}`}</p>
          <p>${displayPrice}</p>
        </span>
      </div>
      <FontAwesomeIcon
        type="button"
        onClick={deleteSelf}
        color="black"
        size="lg"
        icon={faTrash}
        className="cart-drawer--item-delete hover-pointer"
      />
    </div>
  );
}
