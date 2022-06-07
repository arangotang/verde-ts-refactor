import React, { Dispatch, SetStateAction } from 'react';
import { nanoid } from 'nanoid';
import { CondensedStyle } from '../Overview';

interface Props {
  styles: CondensedStyle[];
  currStyle: number;
  setCurrStyle: Dispatch<SetStateAction<number>>;
}
export default function StyleSelector(props: Props) {
  const { styles, currStyle, setCurrStyle } = props;

  const handleStyleClick = (idx: number): void => {
    setCurrStyle(idx);
  };

  const thumbnails = styles.map((style, i) => (
    <button
      className={
        currStyle === i ? 'style-thumbnail selected-style' : 'style-thumbnail'
      }
      type="button"
      key={nanoid()}
      onClick={() => handleStyleClick(i)}
    >
      <img
        src={style.iconUrl}
        alt={style.styleId.toString()}
        className="style-selector--thumbnails"
      />
    </button>
  ));

  return <section className="style-selector--container">{thumbnails}</section>;
}
