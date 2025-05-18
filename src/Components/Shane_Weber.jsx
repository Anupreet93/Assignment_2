import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { preloadImages } from '../utils.js';

// Import images
import img1 from '../assets/img1.webp';
import img2 from '../assets/img2.webp';
import img3 from '../assets/img3.webp';
import img4 from '../assets/img4.webp';
import img5 from '../assets/img5.webp';
import img6 from '../assets/img6.webp';
import img7 from '../assets/img7.webp';
import img8 from '../assets/img8.webp';
import img9 from '../assets/img9.webp';
import img10 from '../assets/img10.webp';
import img11 from '../assets/img11.webp';
import img12 from '../assets/img12.webp';
import img13 from '../assets/img13.webp';
import img14 from '../assets/img14.webp';
import img15 from '../assets/img15.webp';
import img16 from '../assets/img16.webp';

// Gallery items
const items = [
  { id: 1, title: 'Drift — A04', model: 'Amelia Hart', img: img1 },
  { id: 2, title: 'Veil — K18', model: 'Irina Volkova', img: img2 },
  { id: 3, title: 'Ember — M45', model: 'Charlotte Byrne', img: img3 },
  { id: 4, title: 'Gleam — S12', model: 'Anastasia Morozova', img: img4 },
  { id: 5, title: 'Bloom — J29', model: 'Eva Ramirez', img: img5 },
  { id: 6, title: 'Whisper — V87', model: 'Milana Petrova', img: img6 },
  { id: 7, title: 'Trace — Z05', model: 'Sofia Carter', img: img7 },
  { id: 8, title: 'Flicker — Q62', model: 'Alina Kuznetsova', img: img8 },
  { id: 9, title: 'Grain — H71', model: 'Isabella Novak', img: img9 },
  { id: 10, title: 'Pulse — B90', model: 'Daria Sokolova', img: img10 },
  { id: 11, title: 'Mist — L36', model: 'Victoria Fields', img: img11 },
  { id: 12, title: 'Shard — Y22', model: 'Natalia Popova & Emily Stone', img: img12 },
  { id: 13, title: 'Vapor — X79', model: 'Yulia Orlova', img: img13 },
  { id: 14, title: 'Glow — F13', model: 'Camila Ford', img: img14 },
  { id: 15, title: 'Flux — N48', model: 'Sofia Mikhailova', img: img15 },
  { id: 16, title: 'Spire — C65', model: 'Ava Bennett', img: img16 }
];

// Animation config
const CONFIG = {
  clipPathDirection: 'top-bottom',
  autoAdjustHorizontalClipPath: true,
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

const ShaneWeberGallery = () => {
  const gridRef = useRef(null);
  const panelRef = useRef(null);
  const panelContentRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const animConfig = useRef({ ...CONFIG });
  const originalConfig = useRef({ ...CONFIG });
  const isAnimating = useRef(false);
  const clickedRef = useRef({ startEl: null, bg: '' });

  useEffect(() => {
    preloadImages('.grid__item-image, .panel__img')
      .finally(() => {
        initListeners();
        setInitialized(true);

        // Animate grid from right to center
        gsap.fromTo(
          gridRef.current,
          { x: '100vw', opacity: 0 },
          {
            x: '0vw',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      });

    return () => document.querySelectorAll('.mover').forEach(m => m.remove());
  }, []);

  useEffect(() => {
    if (activeId != null) {
      const { startEl, bg } = clickedRef.current;
      const endImg = panelRef.current.querySelector('.panel__img');
      if (endImg) {
        endImg.style.backgroundImage = bg;
        animateTransition(startEl, endImg, bg);
      }
    }
  }, [activeId]);

  const initListeners = () => {
    if (!gridRef.current) return;
    gridRef.current.querySelectorAll('.grid__item').forEach(item => {
      item.removeEventListener('click', handleClick);
      item.addEventListener('click', () => handleClick(item));
    });
  };

  const getCenter = el => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const getClipPaths = dir => {
    switch (dir) {
      case 'bottom-top':   return { from:'inset(0% 0% 100% 0%)', reveal:'inset(0% 0% 0% 0%)', hide:'inset(100% 0% 0% 0%)' };
      case 'left-right':   return { from:'inset(0% 100% 0% 0%)', reveal:'inset(0% 0% 0% 0%)', hide:'inset(0% 0% 0% 100%)' };
      case 'right-left':   return { from:'inset(0% 0% 0% 100%)', reveal:'inset(0% 0% 0% 0%)', hide:'inset(0% 100% 0% 0%)' };
      default:             return { from:'inset(100% 0% 0% 0%)', reveal:'inset(0% 0% 0% 0%)', hide:'inset(0% 0% 100% 0%)' };
    }
  };

  const computeDelays = (clicked, els) => {
    const base = getCenter(clicked);
    const distances = [...els].map(el => {
      const c = getCenter(el);
      return Math.hypot(c.x - base.x, c.y - base.y);
    });
    const max = Math.max(...distances) || 1;
    return distances.map(d => (d / max) * animConfig.current.gridItemStaggerFactor);
  };

  const hideHeading = () =>
    gsap.to('.heading, .heading__meta', { opacity: 0, duration: 0.5, ease: 'sine.inOut' });
  const showHeading = () =>
    gsap.to('.heading, .heading__meta', { opacity: 1, duration: 0.5, ease: 'sine.inOut' });

  const animateGridExit = (els, clicked, delays) => {
    const clips = getClipPaths(animConfig.current.clipPathDirection);
    gsap.to(els, {
      opacity: 0,
      scale: el => (el === clicked ? 1 : 0.8),
      clipPath: el => (el === clicked ? clips.from : 'none'),
      duration: el => el === clicked
        ? animConfig.current.stepDuration * animConfig.current.clickedItemDurationFactor
        : 0.3,
      ease: animConfig.current.gridItemEase,
      delay: (_, i) => delays[i]
    });
  };

  const generatePath = (sEl, eEl, steps) => {
    const path = [];
    const sR = sEl.getBoundingClientRect(), eR = eEl.getBoundingClientRect();
    const sC = { x: sR.left + sR.width / 2, y: sR.top + sR.height / 2 };
    const eC = { x: eR.left + eR.width / 2, y: eR.top + eR.height / 2 };
    const full = steps + 2;
    for (let i = 1; i < full - 1; i++) {
      const t = i / (full - 1);
      const width  = gsap.utils.interpolate(sR.width,  eR.width,  t);
      const height = gsap.utils.interpolate(sR.height, eR.height, t);
      path.push({
        left: gsap.utils.interpolate(sC.x, eC.x, t) - width / 2,
        top:  gsap.utils.interpolate(sC.y, eC.y, t) - height / 2,
        width, height
      });
    }
    return path;
  };

  const animateTransition = (startEl, endEl, bg) => {
    hideHeading();
    const path  = generatePath(startEl, endEl, animConfig.current.steps);
    const clips = getClipPaths(animConfig.current.clipPathDirection);

    const frag = document.createDocumentFragment();
    path.forEach((step, idx) => {
      const mover = document.createElement('div');
      mover.className = 'mover';
      Object.assign(mover.style, {
        backgroundImage: bg,
        position: 'fixed',
        zIndex: 1000 + idx,
        clipPath: clips.hide,
        ...step
      });
      mover.offsetHeight;
      frag.appendChild(mover);

      gsap.timeline({ delay: idx * animConfig.current.stepInterval })
        .fromTo(mover,
          { opacity: 0.4 },
          { opacity: 1, clipPath: clips.reveal, duration: animConfig.current.stepDuration, ease: animConfig.current.moverEnterEase }
        )
        .to(mover,
          { clipPath: clips.from, duration: animConfig.current.stepDuration, ease: animConfig.current.moverExitEase, delay: animConfig.current.moverPauseBeforeExit }
        );
    });

    gridRef.current.parentNode.insertBefore(frag, gridRef.current.nextSibling);

    setTimeout(() => document.querySelectorAll('.mover').forEach(m => m.remove()),
      (animConfig.current.steps * animConfig.current.stepInterval +
       animConfig.current.stepDuration * 2 +
       animConfig.current.moverPauseBeforeExit) * 1000
    );

    gsap.set(panelRef.current, { opacity: 1, pointerEvents: 'auto' });
    gsap.timeline({
      defaults: {
        duration: animConfig.current.stepDuration * animConfig.current.panelRevealDurationFactor,
        ease: animConfig.current.panelRevealEase
      }
    })
      .fromTo(endEl, { clipPath: clips.hide }, { clipPath: clips.reveal, delay: animConfig.current.steps * animConfig.current.stepInterval })
      .fromTo(panelContentRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo', onComplete: () => { isAnimating.current = false; } },
        '<'
      );
  };

  const handleClick = item => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const idNum = parseInt(item.dataset.id, 10);
    const bg = getComputedStyle(item.querySelector('.grid__item-image')).backgroundImage;
    clickedRef.current = { startEl: item.querySelector('.grid__item-image'), bg };

    setActiveId(idNum);
    const els = gridRef.current.querySelectorAll('.grid__item');
    animateGridExit(els, item, computeDelays(item, els));
  };

  const handleClose = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    showHeading();
    gsap.to(panelRef.current, { opacity: 0 });

    const els = gridRef.current.querySelectorAll('.grid__item');
    const delays = computeDelays(els[activeId - 1], els);
    gsap.to(els,
      {
        opacity: 1,
        scale: 1,
        delay: (_, i) => delays[i],
        onComplete: () => {
          isAnimating.current = false;
          setActiveId(null);
          animConfig.current = { ...originalConfig.current };
        }
      }
    );
  };

  const mainClass = !initialized ? 'loading' : activeId != null ? 'loading-panel' : '';

  return (
    <main className={mainClass}>
      <section className="heading">
        <h2 className="heading__title">Shane Weber</h2>
        <span className="heading__meta">
          effect 01: straight linear paths, smooth easing, clean timing.
        </span>
      </section>

      <div className="grid" ref={gridRef}>
        {items.map(item => (
          <figure
            key={item.id}
            data-id={item.id}
            className="grid__item"
            role="img"
            aria-labelledby={`caption${item.id}`}
          >
            <div
              className="grid__item-image"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <figcaption id={`caption${item.id}`} className="grid__item-caption">
              <h3>{item.title}</h3>
              <p>Model: {item.model}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeId != null && (
        <aside
          className="panel panel--right"
          ref={panelRef}
          style={{ opacity: 0, pointerEvents: 'none' }}
          onClick={handleClose}
        >
          <div className="panel__img" />
          <div className="panel__content" ref={panelContentRef}>
            <h3>{items.find(i => i.id === activeId)?.title}</h3>
            <p>Model: {items.find(i => i.id === activeId)?.model}</p>
            <button className="panel__close" onClick={handleClose}>
              Close
            </button>
          </div>
        </aside>
      )}
    </main>
  );
};

export default ShaneWeberGallery;
