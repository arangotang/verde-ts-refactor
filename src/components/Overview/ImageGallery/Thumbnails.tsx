import React from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { StylePhotos } from '../../sampleData/sampleProductStylesData';

interface Props {
  photos: StylePhotos[];
  currImgIdx: number;
  setCurrImgIdx: React.Dispatch<React.SetStateAction<number>>;
}

export default function Thumbnails(props: Props) {
  const { currImgIdx, setCurrImgIdx, photos } = props;

  const thumbnailElements = photos.map((photo, i) => (
    <button
      className="main-gallery-thumbnail-container"
      key={nanoid()}
      type="button"
      onClick={() => setCurrImgIdx(i)}
    >
      <img
        src={photo.thumbnail_url}
        alt="thumbnail"
        className={
          currImgIdx === i
            ? 'main-gallery-thumbnail selected-thumbnail'
            : 'main-gallery-thumbnail'
        }
      />
    </button>
  ));

  const displayedThumbnailElements = thumbnailElements.filter((element, i) => {
    if (currImgIdx <= 6 && i <= 6) {
      return true;
    }
    if (currImgIdx > 6 && i >= currImgIdx - 6 && i <= currImgIdx) {
      return true;
    }
    return false;
  });

  return (
    <section className="main-gallery-thumbnails--container">
      <FontAwesomeIcon
        className={currImgIdx !== 0 ? 'hover-pointer' : ''}
        icon={faAngleUp}
        color={currImgIdx !== 0 ? 'black' : 'transparent'}
        type="button"
        style={{ fontSize: '24px' }}
        onClick={() => {
          if (currImgIdx !== 0) {
            setCurrImgIdx((prev) => prev - 1);
          }
        }}
      />
      {displayedThumbnailElements}
      <FontAwesomeIcon
        className={currImgIdx !== photos.length - 1 ? 'hover-pointer' : ''}
        icon={faAngleDown}
        color={currImgIdx !== photos.length - 1 ? 'black' : 'transparent'}
        type="button"
        style={{ fontSize: '24px' }}
        onClick={() => {
          if (currImgIdx !== photos.length - 1) {
            setCurrImgIdx((prev) => prev + 1);
          }
        }}
      />
    </section>
  );
}
