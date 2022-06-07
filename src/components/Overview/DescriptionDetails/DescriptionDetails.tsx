import React, { Dispatch, SetStateAction } from 'react';
import { CartProps } from '../../Header/Header';
import { CondensedStyle, SkuObj } from '../Overview';
import StyleSelector from './StyleSelector';
import Socials from './Socials';
import AddToCart from './AddToCart/AddToCart';
import CustomStars from '../../Shared/CustomStars';
import Price from '../../Shared/Price';

interface Props {
  category: string;
  name: string;
  description: string;
  styles: CondensedStyle[];
  currStyle: number;
  setCurrStyle: Dispatch<SetStateAction<number>>;
  currPrice: number;
  currSalePrice: number;
  reviewCount: number;
  avgRating: number;
  skuData: SkuObj;
  slogan: string;
  setLocalCart: Dispatch<SetStateAction<CartProps[]>>;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  productID: number;
}
export default function DescriptionDetails(props: Props) {
  const {
    category,
    name,
    description,
    styles,
    currStyle,
    setCurrStyle,
    currPrice,
    currSalePrice,
    reviewCount,
    avgRating,
    skuData,
    slogan,
    setLocalCart,
    setShowDrawer,
    productID,
  } = props;

  return (
    <div className="description-details--container fade-in">
      <p className="description-details--category">{category.toUpperCase()}</p>
      <p className="description-details--name">{name}</p>
      {slogan.length && <b className="description-details--slogan">{slogan}</b>}
      {description.length && (
        <p className="description-details--description">{description}</p>
      )}
      {reviewCount > 0 && (
        <span className="description-details--reviews-container">
          <CustomStars rating={avgRating} color="#9a825c" size="20px" />
          <a
            className="description-details--reviews-link"
            href="#ratings-reviews"
          >
            READ ALL {reviewCount} REVIEWS
          </a>
        </span>
      )}
      <Price price={currPrice} salePrice={currSalePrice} fontSize={30} />
      <p className="description-details--style-name">
        {styles[currStyle].name.toUpperCase()}
      </p>
      <StyleSelector
        styles={styles}
        currStyle={currStyle}
        setCurrStyle={setCurrStyle}
      />
      <AddToCart
        skuData={skuData}
        currStyle={currStyle}
        prodName={name}
        styleName={styles[currStyle].name}
        price={currPrice}
        salePrice={currSalePrice}
        styleUrl={styles[currStyle].iconUrl}
        setLocalCart={setLocalCart}
        setShowDrawer={setShowDrawer}
        productID={productID}
      />
      <Socials />
    </div>
  );
}
