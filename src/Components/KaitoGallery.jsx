import React from 'react';

const items = [
  { id: 49, title: 'Pulse — D61', model: 'Sofia Makarova' },
  { id: 50, title: 'Fade — P42', model: 'Scarlett James' },
  { id: 51, title: 'Wisp — T14', model: 'Ekaterina Romanova' },
  { id: 52, title: 'Fragment — G77', model: 'Aria Robinson' },
  { id: 53, title: 'Spiral — Y24', model: 'Daria Petrova' },
  { id: 54, title: 'Trace — Z85', model: 'Chloe Evans' },
  { id: 55, title: 'Flare — C11', model: 'Sofia Orlova' },
  { id: 56, title: 'Chasm — R05', model: 'Grace Walker' },
  { id: 57, title: 'Bloom — N38', model: 'Yana Melnikova' },
  { id: 58, title: 'Shard — W20', model: 'Mila Scott' },
  { id: 59, title: 'Mist — S12', model: 'Natalia Ivanova' },
  { id: 60, title: 'Crush — E31', model: 'Ava Thompson' },
  { id: 61, title: 'Ripple — F68', model: 'Anastasia Novikova' },
  { id: 62, title: 'Gossamer — A07', model: 'Madison Brooks' },
  { id: 63, title: 'Floe — K96', model: 'Ekaterina Smirnova' },
  { id: 64, title: 'Shiver — V44', model: 'Emily Robinson' }
];

export default function KaitoGallery() {
  return (
    <div>
      <div className="heading">
        <h2 className="heading__title">Kaito Nakamo</h2>
        <span className="heading__meta">
          effect 04: Quick upward motion with bold blending and smooth slow reveal.
        </span>
      </div>

      <div className="grid">
        {items.map(({ id, title, model }) => (
          <figure
            key={id}
            className="grid__item"
            role="img"
            aria-labelledby={`caption${id}`}
            data-steps={4}
            data-clip-path-direction="bottom-top"
            data-step-duration={0.25}
            data-step-interval={0.06}
            data-mover-pause-before-exit={0.2}
            data-mover-enter-ease="sine.in"
            data-mover-exit-ease="expo"
            data-panel-reveal-ease="expo"
            data-panel-reveal-duration-factor={4}
            data-mover-blend-mode="hard-light"
          >
            <div
              className="grid__item-image"
              style={{ backgroundImage: `url(assets/img${id - 33}.webp)` }}
            />
            <figcaption className="grid__item-caption" id={`caption${id}`}>  
              <h3>{title}</h3>
              <p>Model: {model}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
