import React, { useState, useEffect } from 'react';

export enum MsgTypes {
  Warning = 'warning',
  Success = 'success',
  Failure = 'failure',
  None = 'none',
}

interface Props {
  message: MsgTypes;
}
export default function CartMessage({ message }: Props) {
  const msg = {
    color: 'red',
    backgroundColor: 'pink',
    text: 'Please pick a size!',
  };

  switch (message) {
    case MsgTypes.Failure:
      msg.color = 'red';
      msg.backgroundColor = 'pink';
      msg.text = 'Cart addition failed, please try again';
      break;
    case MsgTypes.Success:
      msg.color = 'darkgreen';
      msg.backgroundColor = 'lightgreen';
      msg.text = 'Added to cart!';
      break;
  }

  return (
    <div
      className="add-to-cart--message"
      style={{
        backgroundColor: msg.backgroundColor,
        color: msg.color,
      }}
    >
      {msg.text}
    </div>
  );
}
