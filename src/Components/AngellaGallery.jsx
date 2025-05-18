import React from 'react';

const items = [
  { id: 33, title: 'Whorl — B45', model: 'Anastasia Volkova' },
  { id: 34, title: 'Flicker — D17', model: 'Sophia White' },
  { id: 35, title: 'Gleam — Z58', model: 'Polina Sokolova' },
  { id: 36, title: 'Shard — J03', model: 'Ava Mitchell' },
  { id: 37, title: 'Trace — Q29', model: 'Maria Ivanenko' },
  { id: 38, title: 'Crush — W92', model: 'Ella Foster' },
  { id: 39, title: 'Veil — X16', model: 'Yulia Morozova' },
  { id: 40, title: 'Clasp — S84', model: 'Charlotte Hayes' },
  { id: 41, title: 'Flint — T66', model: 'Viktoria Kuznetsova' },
  { id: 42, title: 'Spire — E49', model: 'Amelia Parker' },
  { id: 43, title: 'Plume — N22', model: 'Daria Smirnova' },
  { id: 44, title: 'Hollow — B75', model: 'Zoe Adams' },
  { id: 45, title: 'Brume — K10', model: 'Anastasiya Orlova' },
  { id: 46, title: 'Crave — F37', model: 'Mia Bennett' },
  { id: 47, title: 'Quiver — R19', model: 'Natalia Volkova' },
  { id: 48, title: 'Fathom — L52', model: 'Isabella Young' }
];

export default function AngelaGallery() {
  return (
    <div>
      <div className="heading">
        <h2 className="heading__title">Angela Wong</h2>
        <span className="heading__meta">
          effect 03: Big arcs, smooth start, powerful snap, slow reveal.
        </span>
      </div>

      <div className="grid">
        {items.map(({ id, title, model }) => (
          <figure
            key={id}
            className="grid__item"
            role="img"
            aria-labelledby={`caption${id}`}
            data-steps={10}
            data-step-duration={0.3}
            data-path-motion="sine"
            data-sine-amplitude={300}
            data-clip-path-direction="left-right"
            data-auto-adjust-horizontal-clip-path={true}
            data-step-interval={0.07}
            data-mover-pause-before-exit={0.3}
            data-mover-enter-ease="sine"
            data-mover-exit-ease="power4"
            data-panel-reveal-ease="power4"
            data-panel-reveal-duration-factor={4}
          >
            <div
              className="grid__item-image"
              style={{ backgroundImage: `url(assets/img${id}.webp)` }}
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
