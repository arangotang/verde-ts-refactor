import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { nanoid } from 'nanoid';
import { SkuObj } from '../../Overview';

interface Props {
  skuData: SkuObj;
  currSku: string;
  setCurrSku: Dispatch<SetStateAction<string>>;
}

export default function SizeSelector(props: Props) {
  const { skuData, currSku, setCurrSku } = props;

  const sizeOptions = Object.keys(skuData).map((key) => (
    <option key={nanoid()} value={key}>
      {skuData[key].size}
    </option>
  ));

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrSku(e.target.value);
  };

  return sizeOptions.length > 1 ? (
    <select value={currSku} onChange={handleChange} className="size-select">
      {sizeOptions}
    </select>
  ) : (
    <select value="oos" disabled className="size-select">
      <option value="oos">OUT OF STOCK</option>
    </select>
  );
}
