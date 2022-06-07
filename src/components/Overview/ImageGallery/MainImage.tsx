import React, { useState, useEffect } from 'react';

interface Props {
  currPhotoUrl: string;
}

export default function MainImage(props: Props) {
  const { currPhotoUrl } = props;

  const [className, setClassName] = useState<string>('fade-in');

  useEffect(() => {
    setClassName('transparent');
    const timeoutId = setTimeout(() => {
      setClassName('fade-in');
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currPhotoUrl]);

  return (
    <img
      id="main-gallery--img"
      className={className}
      src={currPhotoUrl}
      alt="sample img"
    />
  );
}
