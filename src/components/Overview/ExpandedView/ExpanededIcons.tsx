import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faCaretRight,
  faCaretLeft,
} from '@fortawesome/free-solid-svg-icons';

import { nanoid } from 'nanoid';
import { StylePhotos } from '../../sampleData/sampleProductStylesData';

interface Props {
  photos: StylePhotos[];
  currImgIdx: number;
  setCurrImgIdx: Dispatch<SetStateAction<number>>;
}

export default function ExpandedIcons({
  photos,
  currImgIdx,
  setCurrImgIdx,
}: Props) {
  const iconElements = photos.map((photo, i) => (
    <FontAwesomeIcon
      className="hover-pointer"
      icon={faCircle}
      size="lg"
      color="black"
      style={{
        opacity: currImgIdx === i ? '1' : '0.5',
      }}
      key={nanoid()}
      type="button"
      onClick={() => setCurrImgIdx(i)}
    />
  ));

  const displayedIconElements = iconElements.filter((element, i) => {
    if (currImgIdx <= 6 && i <= 6) {
      return true;
    }
    if (currImgIdx > 6 && i >= currImgIdx - 6 && i <= currImgIdx) {
      return true;
    }
    return false;
  });

  return (
    <section className="expanded-icons--container">
      <FontAwesomeIcon
        className={
          currImgIdx !== 0
            ? 'hover-pointer expanded-icons--carat'
            : 'expanded-icons--carat'
        }
        icon={faCaretLeft}
        size="lg"
        color={currImgIdx !== 0 ? 'black' : 'transparent'}
        onClick={() => {
          if (currImgIdx !== 0) {
            setCurrImgIdx((prev) => prev - 1);
          }
        }}
      />
      {displayedIconElements}
      <FontAwesomeIcon
        className={
          currImgIdx !== photos.length - 1
            ? 'hover-pointer expanded-icons--carat'
            : 'expanded-icons--carat'
        }
        icon={faCaretRight}
        size="lg"
        color={currImgIdx !== photos.length - 1 ? 'black' : 'transparent'}
        onClick={() => {
          if (currImgIdx !== photos.length - 1) {
            setCurrImgIdx((prev) => prev + 1);
          }
        }}
      />
    </section>
  );
}
