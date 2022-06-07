import React from 'react';
import Thumbnails from './Thumbnails';
import MainImage from './MainImage';
import { StylePhotos } from '../../sampleData/sampleProductStylesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
  changeImgView: () => void;
  currImgIdx: number;
  incrementIdx: () => void;
  decrementIdx: () => void;
  setCurrImgIdx: React.Dispatch<React.SetStateAction<number>>;
  photos: StylePhotos[];
}
export default function ImageGallery(props: Props) {
  const {
    changeImgView,
    currImgIdx,
    incrementIdx,
    decrementIdx,
    setCurrImgIdx,
    photos,
  } = props;
  return (
    <section className="main-gallery--container">
      <Thumbnails
        currImgIdx={currImgIdx}
        setCurrImgIdx={setCurrImgIdx}
        photos={photos}
      />
      <FontAwesomeIcon
        icon={faAngleLeft}
        className={currImgIdx !== 0 ? 'hover-pointer' : ''}
        style={{ fontSize: '24px', marginLeft: '1em' }}
        type="button"
        onClick={() => {
          if (currImgIdx) {
            decrementIdx();
          }
        }}
        color={currImgIdx === 0 ? 'transparent' : 'black'}
      />
      <div className="main-gallery--frame">
        <a href="#expanded">
          <button
            type="button"
            className="main-image-btn"
            onClick={changeImgView}
          >
            <MainImage currPhotoUrl={photos[currImgIdx].url} />
          </button>
        </a>
      </div>
      <FontAwesomeIcon
        icon={faAngleRight}
        className={currImgIdx !== photos.length - 1 ? 'hover-pointer' : ''}
        style={{ fontSize: '24px' }}
        type="button"
        onClick={() => {
          if (currImgIdx !== photos.length - 1) {
            incrementIdx();
          }
        }}
        color={currImgIdx === photos.length - 1 ? 'transparent' : 'black'}
      />
    </section>
  );
}
