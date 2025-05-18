import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { preloadImages } from '../utils.js';

// Import images
import img17 from '../assets/img17.webp';
import img18 from '../assets/img18.webp';
import img19 from '../assets/img19.webp';
import img20 from '../assets/img20.webp';
import img21 from '../assets/img21.webp';
import img22 from '../assets/img22.webp';
import img23 from '../assets/img23.webp';
import img24 from '../assets/img24.webp';
import img25 from '../assets/img25.webp';
import img26 from '../assets/img26.webp';
import img27 from '../assets/img27.webp';
import img28 from '../assets/img28.webp';
import img29 from '../assets/img29.webp';
import img30 from '../assets/img30.webp';
import img31 from '../assets/img31.webp';
import img32 from '../assets/img32.webp';

const items2 = [
  { id: 17, title: 'Driftwood — W50', model: 'Valeria Smirnova', img: img17 },
  { id: 18, title: 'Fold — T81', model: 'Emma Chase', img: img18 },
  { id: 19, title: 'Shroud — E26', model: 'Marina Belova', img: img19 },
  { id: 20, title: 'Ripple — P34', model: 'Chloe Martin', img: img20 },
  { id: 21, title: 'Fray — U07', model: 'Alexandra Dmitrieva', img: img21 },
  { id: 22, title: 'Wane — R52', model: 'Isabella Moore', img: img22 },
  { id: 23, title: 'Tide — S33', model: 'Ksenia Egorova', img: img23 },
  { id: 24, title: 'Rift — G08', model: 'Mia Anderson', img: img24 },
  { id: 25, title: 'Spool — H94', model: 'Anna Mikhailova', img: img25 },
  { id: 26, title: 'Glitch — M70', model: 'Emily Brown', img: img26 },
  { id: 27, title: 'Slip — F02', model: 'Ekaterina Ivanova', img: img27 },
  { id: 28, title: 'Husk — C15', model: 'Olivia Reed', img: img28 },
  { id: 29, title: 'Blur — V86', model: 'Sofia Lebedeva', img: img29 },
  { id: 30, title: 'Fracture — A63', model: 'Harper Gray', img: img30 },
  { id: 31, title: 'Mote — Y39', model: 'Elizaveta Petrova', img: img31 },
  { id: 32, title: 'Aura — K21', model: 'Lily Cooper', img: img32 }
];

const SHANE2 = {
  steps: 6,
  stepDuration: 0.35,
  stepInterval: 0.05,
  moverPauseBeforeExit: 0.14,
  panelRevealEase: 'sine.inOut',
  gridItemEase: 'sine',
  moverEnterEase: 'sine.in',
  moverExitEase: 'sine',
  panelRevealDurationFactor: 2,
  clickedItemDurationFactor: 2,
  gridItemStaggerFactor: 0.3
};

export default function ManikaGallery() {
  const gridRef = useRef(null);
  const panelRef = useRef(null);
  const panelImgRef2 = useRef(null);
  const panelContentRef2 = useRef(null);
  const [activeData, setActiveData] = useState(null);
  const [initialized2, setInitialized2] = useState(false);

  useEffect(() => {
    preloadImages('.grid__item-image, .panel__img').finally(() => setInitialized2(true));
  }, []);

  useEffect(() => {
    if (!activeData) return;
    const { el, item } = activeData;
    const all = gridRef.current.querySelectorAll('.grid__item');
    const delays = computeDelays(el, all);
    exitGrid(all, el, delays);
    flyTransition(el, panelImgRef2.current, `url(${item.img})`);
    fillPanel(item);
  }, [activeData]);

  const getCenter2 = el => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const computeDelays = (baseEl, els) => {
    const base = getCenter2(baseEl);
    const dists = Array.from(els).map(el => {
      const c = getCenter2(el);
      return Math.hypot(c.x - base.x, c.y - base.y);
    });
    const mx = Math.max(...dists) || 1;
    return dists.map(d => (d / mx) * SHANE2.gridItemStaggerFactor);
  };

  const exitGrid = (els, clicked, delays) => {
    const clips = getClipPaths('top-bottom');
    gsap.to(els, {
      opacity: 0,
      scale: el => (el === clicked ? 1 : 0.8),
      clipPath: el => (el === clicked ? clips.from : 'none'),
      duration: el =>
        el === clicked
          ? SHANE2.stepDuration * SHANE2.clickedItemDurationFactor
          : 0.3,
      ease: SHANE2.gridItemEase,
      delay: (_, i) => delays[i]
    });
  };

  function getClipPaths(dir) {
    switch (dir) {
      case 'bottom-top':
        return { from: 'inset(0% 0% 100% 0%)' };
      default:
        return { from: 'inset(100% 0% 0% 0%)' };
    }
  }

  const flyTransition = (sEl, eEl, bg) => {
    const sR = sEl.getBoundingClientRect();
    const eR = eEl.getBoundingClientRect();
    const frag = document.createDocumentFragment();
    const w = window.innerWidth;
    for (let i = 0; i < SHANE2.steps; i++) {
      const t = i / (SHANE2.steps - 1);
      const mover = document.createElement('div');
      mover.className = 'mover';
      Object.assign(mover.style, { backgroundImage: bg, position: 'fixed', zIndex: 1000 + i });
      gsap.set(mover, {
        left: lerp(sR.left, eR.left, t),
        top: lerp(sR.top, eR.top, t),
        width: lerp(sR.width, eR.width, t),
        height: lerp(sR.height, eR.height, t),
        clipPath: 'inset(100% 0% 0% 0%)'
      });
      frag.appendChild(mover);
      gsap.timeline({ delay: i * SHANE2.stepInterval })
        .to(mover, {
          opacity: 1,
          x: w - (sR.left + (eR.left - sR.left) * t) - (sR.width + (eR.width - sR.width) * t),
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: SHANE2.stepDuration,
          ease: SHANE2.moverEnterEase
        })
        .to(mover, {
          opacity: 0,
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: SHANE2.stepDuration,
          ease: SHANE2.moverExitEase,
          delay: SHANE2.moverPauseBeforeExit
        });
    }
    gridRef.current.parentNode.insertBefore(frag, gridRef.current.nextSibling);
    setTimeout(() => document.querySelectorAll('.mover').forEach(m => m.remove()),
      SHANE2.steps * SHANE2.stepInterval * 1000 + 1500
    );
    revealPanel();
  };

  function revealPanel() {
    gsap.set(panelContentRef2.current, { opacity: 0 });
    gsap.set(panelRef.current, { opacity: 1, pointerEvents: 'auto' });
    gsap.timeline({ defaults: { duration: SHANE2.stepDuration * SHANE2.panelRevealDurationFactor, ease: SHANE2.panelRevealEase } })
      .fromTo(panelImgRef2.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' })
      .fromTo(panelContentRef2.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo' });
  }

  const lerp = (a, b, t) => a + (b - a) * t;

  const fillPanel = item => {
    panelImgRef2.current.style.backgroundImage = `url(${item.img})`;
    panelContentRef2.current.querySelector('h3').textContent = item.title;
    panelContentRef2.current.querySelector('p').textContent = `Model: ${item.model}`;
  };

  const closeView = e => {
    if (e) e.stopPropagation();
    const all = gridRef.current.querySelectorAll('.grid__item');
    gsap.to(all, { opacity: 1, scale: 1, duration: 0.3, ease: SHANE2.gridItemEase });
    gsap.to(panelRef.current, { opacity: 0, duration: 0.3, onComplete: () => setActiveData(null) });
  };

  return (
    <main className={!initialized2 ? 'loading' : activeData ? 'loading-panel' : ''}>
      <div className="grid" ref={gridRef}>
        {items2.map(item => (
          <figure key={item.id} className="grid__item" onClick={e => setActiveData({ el: e.currentTarget, item })}>
            <div className="grid__item-image" style={{ backgroundImage: `url(${item.img})` }} />
            <figcaption><h3>{item.title}</h3><p>Model: {item.model}</p></figcaption>
          </figure>
        ))}
      </div>
      {activeData && (
        <aside className="panel panel--right" ref={panelRef} style={{ opacity: 0, pointerEvents: 'none' }} onClick={closeView}>
          <div className="panel__img" ref={panelImgRef2} />
          <div className="panel__content" ref={panelContentRef2} onClick={e => e.stopPropagation()}>
            <h3></h3>
            <p></p>
            <button className="panel__close" onClick={closeView}>Close</button>
          </div>
        </aside>
      )}
    </main>
  );
}
