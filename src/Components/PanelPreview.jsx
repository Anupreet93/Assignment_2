import React from 'react';
import panelImg from '../assets/img1.webp';

// Panel preview using static image import
function PanelPreview({ title, description, onClose }) {
  return (
    <div>
      <figure className="panel" role="img" aria-labelledby="caption">
        <div
          className="panel__img"
          style={{ backgroundImage: `url(${panelImg})` }}
        />
        <figcaption className="panel__content" id="caption">
          <h3>{title}</h3>
          <p>{description}</p>
          <button
            type="button"
            className="panel__close"
            aria-label="Close preview"
            onClick={onClose}
          >
            Close
          </button>
        </figcaption>
      </figure>

      <footer className="frame frame--footer">
        <span>
          Made by{' '}
          <a href="https://codrops.com/" className="line">
            @codrops
          </a>
        </span>
        <span>
          <a href="https://tympanus.net/codrops/demos/" className="line">
            All demos
          </a>
        </span>
      </footer>
    </div>
  );
}

export default PanelPreview;
