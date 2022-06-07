import React, { useState, useEffect } from "react";
import Header, { CartProps } from "./Header/Header";
import Overview from "./Overview/Overview";
import currentProduct from "./sampleData/sampleProductData";

interface Feature {
  feature: string;
  value: string;
}

export interface Product {
  id: number;
  campus: string;
  name: string;
  slogan: string;
  description: string;
  category: string;
  default_price: string;
  created_at: string;
  updated_at: string;
  features: Feature[];
}
function App() {
  const [productID, setProductID] = useState<number>(40344);
  const [curProd, setCurProd] = useState<Product>(currentProduct);
  const [localCart, setLocalCart] = useState<CartProps[]>(
    JSON.parse(localStorage.getItem("localCart") as string) || []
  );
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (localCart.length) {
      const [newCount, newSku] = [
        localCart[localCart.length - 1].count,
        localCart[localCart.length - 1].skuId,
      ];
      for (let i = 0; i < localCart.length - 1; i += 1) {
        if (localCart[i].skuId === newSku) {
          setLocalCart((prevCart) => {
            const newCart = prevCart.slice();
            newCart[i].count = (
              Number(newCount) + Number(newCart[i].count)
            ).toString();
            return newCart.slice(0, prevCart.length - 1);
          });
        }
      }
    }
    localStorage.setItem("localCart", JSON.stringify(localCart));
  }, [localCart]);

  const deleteCartItem = (idx: number): void => {
    setLocalCart((prevCart) => {
      const newCart = [...prevCart.slice(0, idx), ...prevCart.slice(idx + 1)];
      for (let i = 0; i < newCart.length; i += 1) {
        newCart[i].idx = i;
      }
      return newCart.slice();
    });
  };

  return (
    <>
      <Header
        localCart={localCart}
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        deleteCartItem={deleteCartItem}
        setCurProd={setCurProd}
      />
      <Overview
        setLocalCart={setLocalCart}
        setShowDrawer={setShowDrawer}
        productID={productID}
      />
    </>
  );
}

export default App;
