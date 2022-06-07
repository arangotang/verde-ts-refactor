import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { nanoid } from 'nanoid';

interface Props {
  availQty: string[];
  selectedQty: string;
  setSelectedQty: Dispatch<SetStateAction<string>>;
}

export default function QtySelector({
  availQty,
  selectedQty,
  setSelectedQty,
}: Props) {
  const qtyOptions = availQty.map((qty) => (
    <option key={nanoid()} value={qty}>
      {qty}
    </option>
  ));

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedQty(e.target.value);
  };

  return availQty[0] === '-' ? (
    <select value={selectedQty} disabled className="qty-select">
      {qtyOptions}
    </select>
  ) : (
    <select value={selectedQty} onChange={handleChange} className="qty-select">
      {qtyOptions}
    </select>
  );
}
