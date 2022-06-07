import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../App";
import { CartProps } from "../Header/Header";
import sampleProductData from "../sampleData/sampleProductData";
import sampleProductStylesData from "../sampleData/sampleProductStylesData";
import sampleProductReviewsData from "../sampleData/sampleProductReviewsData";
import { StyleData } from "../sampleData/sampleProductStylesData";
import { ReviewsData } from "../sampleData/sampleProductReviewsData";
import config from "../../config/config";

interface Props {
  setLocalCart: Dispatch<SetStateAction<CartProps[]>>;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  productID: number;
}

interface SkuInfo {
  quantity: string;
  size: string;
}

interface SkuObj {
  [key: string]: SkuInfo;
}

interface LoadedProps {
  product: boolean;
  styles: boolean;
  reviews: boolean;
}

export default function Overview(props: Props) {
  const [isDefaultImgView, setIsDefaultImgView] = useState<boolean>(true);
  const [currImgIdx, setCurrImgIdx] = useState<number>(0);
  const [currStyle, setCurrStyle] = useState<number>(0);
  const [skuData, setSkuData] = useState<SkuObj>({
    "Select Size": {
      quantity: "-",
      size: "Select Size...",
    },
  });
  const [productData, setProductData] = useState<Product>(sampleProductData);
  const [productStylesData, setProductStylesData] = useState<StyleData>(
    sampleProductStylesData
  );
  const [productReviewsData, setProductReviewsData] = useState<ReviewsData>(
    sampleProductReviewsData
  );
  const [isLoaded, setIsLoaded] = useState<LoadedProps>({
    product: false,
    styles: false,
    reviews: false,
  });

  const { setLocalCart, setShowDrawer, productID } = props;

  const url = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/";
  useEffect(() => {
    setCurrImgIdx(0);
    setCurrStyle(0);
    setIsLoaded({
      product: false,
      styles: false,
      reviews: false,
    });
    axios
      .get(`${url}products/${productID}`, {
        headers: { Authorization: config.TOKEN },
      })
      .then((res) => {
        setProductData(res.data);
        setIsLoaded((prev) => ({
          ...prev,
          product: true,
        }));
      });

    axios
      .get(`${url}products/${productID}/styles`, {
        headers: { Authorization: config.TOKEN },
      })
      .then((res) => {
        setProductStylesData(res.data);
        setIsLoaded((prev) => ({
          ...prev,
          styles: true,
        }));
      });

    axios
      .get(`${url}reviews/meta?product_id=${productID}`, {
        headers: { Authorization: config.TOKEN },
      })
      .then((res) => {
        setProductReviewsData(res.data);
        setIsLoaded((prev) => ({
          ...prev,
          reviews: true,
        }));
      });
  }, [productID]);

  useEffect(() => {
    setSkuData({
      ...productStylesData.results[currStyle].skus,
      "Select Size": {
        quantity: "-",
        size: "Select Size...",
      },
    });
  }, [currStyle, productStylesData]);

  let avgRating = 0;
  const reviewCount = Object.keys(productReviewsData.ratings).reduce(
    (aggCount: number, key: string) => {
      const currCount = Number(productReviewsData.ratings[Number(key)]);
      avgRating += currCount * Number(key);
      return aggCount + currCount;
    },
    0
  );
  avgRating /= reviewCount;

  const styles = productStylesData.results.map((style) => ({
    styleId: style.style_id,
    iconUrl: style.photos[0].thumbnail_url,
    name: style.name,
  }));

  const incrementIdx = () => {
    setCurrImgIdx((prev) => prev + 1);
  };

  const decrementIdx = () => {
    setCurrImgIdx((prev) => prev - 1);
  };

  const changeImgView = () => {
    setIsDefaultImgView((prev) => {
      if (prev) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "initial";
      }
      return !prev;
    });
  };

  const currPrice = Number(productStylesData.results[currStyle].original_price);

  const currSalePrice =
    productStylesData.results[currStyle].sale_price === null
      ? 0
      : Number(productStylesData.results[currStyle].sale_price);

  return <p>This is the overview</p>;
}
