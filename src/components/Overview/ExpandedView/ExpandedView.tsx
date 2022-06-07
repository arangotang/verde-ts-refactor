import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompress,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import ExpanededIcons from './ExpanededIcons';
import { StylePhotos } from '../../sampleData/sampleProductStylesData';

interface Props {
  changeImgView: () => void;
  currPhotoUrl: string;
  photos: StylePhotos[];
  setCurrImgIdx: Dispatch<SetStateAction<number>>;
  currImgIdx: number;
}
export default function ExpandedView({
  changeImgView,
  currPhotoUrl,
  photos,
  setCurrImgIdx,
  currImgIdx,
}: Props) {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [x, setX] = useState<string>('0');
  const [y, setY] = useState<string>('0');

  const handleImageClick = () => {
    setIsZoomed((prev) => !prev);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isZoomed) {
      setX(`${(0.5 * window.innerWidth - e.nativeEvent.clientX).toString()}`);
      setY(`${(0.5 * window.innerHeight - e.nativeEvent.clientY).toString()}`);
    }
  };

  return (
    <section id="expanded">
      {currImgIdx !== 0 && !isZoomed && (
        <FontAwesomeIcon
          icon={faAngleLeft}
          type="button"
          color="black"
          size="lg"
          className="expanded-view--arrows expanded-view--left-carat"
          onClick={() => {
            setCurrImgIdx((prev) => prev - 1);
          }}
        />
      )}
      {currImgIdx !== photos.length - 1 && !isZoomed && (
        <FontAwesomeIcon
          icon={faAngleRight}
          type="button"
          color="black"
          size="lg"
          className="expanded-view--arrows expanded-view--right-carat"
          onClick={() => {
            setCurrImgIdx((prev) => prev + 1);
          }}
        />
      )}
      <div className="expanded-view--frame">
        {!isZoomed ? (
          <button
            className="expanded-view--default-btn"
            type="button"
            onClick={handleImageClick}
          >
            <img
              src={currPhotoUrl}
              className="expanded-view--standard"
              alt="big img"
            />
          </button>
        ) : (
          <button
            className="expanded-view--zoomed-btn"
            type="button"
            onClick={handleImageClick}
          >
            <img
              src={currPhotoUrl}
              className="expanded-view--zoomed"
              alt="big img"
              style={{
                top: `${y}px`,
                left: `${x}px`,
              }}
              onMouseMove={handleMouseMove}
            />
          </button>
        )}
        {!isZoomed && (
          <a
            href="#top"
            onClick={() => {
              changeImgView();
            }}
          >
            <FontAwesomeIcon
              className="expanded-view--compress"
              icon={faCompress}
              color="black"
              type="button"
              size="lg"
            />
          </a>
        )}
        {!isZoomed && (
          <ExpanededIcons
            photos={photos}
            currImgIdx={currImgIdx}
            setCurrImgIdx={setCurrImgIdx}
          />
        )}
      </div>
    </section>
  );
}
