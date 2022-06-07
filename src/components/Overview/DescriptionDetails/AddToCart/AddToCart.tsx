import axios from 'axios';
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent,
} from 'react';
import CartMessage, { MsgTypes } from './CartMessage';
import config from '../../../../config/config';
import { CartProps } from '../../../Header/Header';
import { SkuObj } from '../../Overview';

interface Props {
  skuData: SkuObj;
  currStyle: number;
  productID: number;
  prodName: string;
  styleUrl: string;
  styleName: string;
  price: number;
  salePrice: number;
  setLocalCart: Dispatch<SetStateAction<CartProps[]>>;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
}

export default function AddToCart(props: Props) {
  const {
    skuData,
    currStyle,
    prodName,
    styleName,
    price,
    salePrice,
    styleUrl,
    setLocalCart,
    setShowDrawer,
    productID,
  } = props;

  const [currSku, setCurrSku] = useState<string>('Select Size');
  const [availQty, setAvailQty] = useState<string[]>(['-']);
  const [selectedQty, setSelectedQty] = useState<string>('-');
  const [message, setMessage] = useState<MsgTypes>(MsgTypes.None);

  useEffect(() => {
    let newMax = skuData[currSku].quantity;
    if (newMax === '-') {
      setAvailQty([newMax]);
      setSelectedQty('-');
    } else {
      newMax = Number(newMax) <= 15 ? newMax : (15).toString();
      const newQty = [];
      for (let i = 1; i <= Number(newMax); i += 1) {
        newQty.push(i.toString());
      }
      setAvailQty(newQty);
      setSelectedQty(newQty[0]);
    }
  }, [currSku, skuData]);

  useEffect(() => {
    setCurrSku('Select Size');
    setAvailQty(['-']);
    setSelectedQty('-');
  }, [currStyle]);

  const handleCartSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currSku === 'Select Size') {
      setMessage(MsgTypes.Warning);
    } else {
      setMessage(MsgTypes.None);
      const count = selectedQty;
      setLocalCart((prevCart: CartProps[]) => {
        const localCartItem = {
          count,
          prodName,
          styleName,
          styleUrl,
          price,
          salePrice,
          productID,
          size: skuData[currSku].size,
          skuId: currSku,
          idx: prevCart.length,
        };
        return [...prevCart, localCartItem];
      });
      const postPromises: any[] = [];
      for (let i = 0; i < Number(count); i += 1) {
        postPromises.push(
          axios.post(
            'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
            {
              sku_id: Number(currSku),
              count,
            },
            { headers: { Authorization: config.TOKEN } }
          )
        );
      }
      Promise.all(postPromises)
        .then(() => {
          setShowDrawer(true);
        })
        .catch(() => {
          setMessage(MsgTypes.Failure);
        });
    }
  };

  return (
    <form onSubmit={handleCartSubmit} className="add-to-cart--container">
      <span>
        {message !== MsgTypes.None && <CartMessage message={message} />}
        <p>Size Selector</p>
        <p>Qty Selector</p>
      </span>
      <button type="submit" className="add-to-cart--btn">
        ADD TO CART
      </button>
    </form>
  );
}
