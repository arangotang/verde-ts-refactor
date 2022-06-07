import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faPinterestSquare,
} from '@fortawesome/free-brands-svg-icons';

export default function Socials() {
  const iconSize = { fontSize: '36px' };

  return (
    <section className="socials-container">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fhackreactor&amp;src=sdkpreparse"
      >
        <FontAwesomeIcon
          icon={faFacebookSquare}
          color="grey"
          style={iconSize}
          className="fb-social"
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/intent/tweet?hashtags=FEC&original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=Team%20Verde%20really%20killed%20it%20%40HackReactor%20https%3A%2F%2Fgithub.com%2FRFP-Verde"
      >
        <FontAwesomeIcon
          icon={faTwitterSquare}
          color="grey"
          style={iconSize}
          className="twt-social"
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.pinterest.com/pin/create/button/"
        data-pin-do="buttonBookmark"
        data-pin-tall="true"
      >
        <FontAwesomeIcon
          icon={faPinterestSquare}
          color="grey"
          style={iconSize}
          className="pnt-social"
        />
      </a>
    </section>
  );
}
