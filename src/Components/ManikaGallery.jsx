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

// Gallery items
const items = [
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

const DEFAULT_CONFIG = {
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

export default function ManikaGallery() {
  const gridRef = useRef(null);
  const panelRef = useRef(null);
  const panelContentRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const animConfig = useRef({ ...DEFAULT_CONFIG });
  const originalConfig = useRef({ ...DEFAULT_CONFIG });
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
          { x: '0vw', opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
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
      case 'bottom-top':   return { from: 'inset(0% 0% 100% 0%)', reveal: 'inset(0% 0% 0% 0%)', hide: 'inset(100% 0% 0% 0%)' };
      case 'left-right':   return { from: 'inset(0% 100% 0% 0%)', reveal: 'inset(0% 0% 0% 0%)', hide: 'inset(0% 0% 0% 100%)' };
      case 'right-left':   return { from: 'inset(0% 0% 0% 100%)', reveal: 'inset(0% 0% 0% 0%)', hide: 'inset(0% 100% 0% 0%)' };
      default:             return { from: 'inset(100% 0% 0% 0%)', reveal: 'inset(0% 0% 0% 0%)', hide: 'inset(0% 0% 100% 0%)' };
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

  const hideHeading = () => gsap.to('.heading, .heading__meta', { opacity: 0, duration: 0.5, ease: 'sine.inOut' });
  const showHeading = () => gsap.to('.heading, .heading__meta', { opacity: 1, duration: 0.5, ease: 'sine.inOut' });

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
    const sR = sEl.getBoundingClientRect();
    const eR = eEl.getBoundingClientRect();
    const sC = { x: sR.left + sR.width / 2, y: sR.top + sR.height / 2 };
    const eC = { x: eR.left + eR.width / 2, y: eR.top + eR.height / 2 };
    const full = steps + 2;
    for (let i = 1; i < full - 1; i++) {
      const t = i / (full - 1);
      const width = gsap.utils.interpolate(sR.width, eR.width, t);
      const height = gsap.utils.interpolate(sR.height, eR.height, t);
      path.push({
        left: gsap.utils.interpolate(sC.x, eC.x, t) - width / 2,
        top: gsap.utils.interpolate(sC.y, eC.y, t) - height / 2,
        width,
        height
      });
    }
    return path;
  };

  const animateTransition = (startEl, endEl, bg) => {
    hideHeading();
    const path = generatePath(startEl, endEl, animConfig.current.steps);
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

    // Override config based on data-* attributes
    const ds = item.dataset;
    animConfig.current = {
      ...originalConfig.current,
      steps: parseInt(ds.steps, 10) || originalConfig.current.steps,
      stepInterval: parseFloat(ds.stepInterval) || originalConfig.current.stepInterval,
      moverPauseBeforeExit: parseFloat(ds.moverPauseBeforeExit) || originalConfig.current.moverPauseBeforeExit,
      moverEnterEase: ds.moverEnterEase || originalConfig.current.moverEnterEase,
      moverExitEase: ds.moverExitEase || originalConfig.current.moverExitEase,
      panelRevealEase: ds.panelRevealEase || originalConfig.current.panelRevealEase
    };

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
    const delays = computeDelays(els[activeId - 17], els);
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
        <h2 className="heading__title">Manika Jorge</h2>
        <span className="heading__meta">effect 02: Adjusts mover count, rotation, timing, and animation feel.</span>
      </section>

      <div className="grid" ref={gridRef}>
        {items.map(({ id, title, model, img }) => (
          <figure
            key={id}
            data-id={id}
            className="grid__item"
            role="img"
            aria-labelledby={`caption${id}`}
            data-steps={8}
            data-rotation-range={7}
            data-step-interval={0.05}
            data-mover-pause-before-exit={0.25}
            data-mover-enter-ease="sine.in"
            data-mover-exit-ease="power2"
            data-panel-reveal-ease="power2"
          >
            <div className="grid__item-image" style={{ backgroundImage: `url(${img})` }}/>
            <figcaption className="grid__item-caption" id={`caption${id}`}>
              <h3>{title}</h3>
              <p>Model: {model}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeId != null && (
        <aside className="panel panel--right" ref={panelRef} style={{ opacity: 0, pointerEvents: 'none' }} onClick={handleClose}>
          <div className="panel__img" />
          <div className="panel__content" ref={panelContentRef}>
            <h3>{items.find(i => i.id === activeId)?.title}</h3>
            <p>Model: {items.find(i => i.id === activeId)?.model}</p>
            <button className="panel__close" onClick={handleClose}>Close</button>
          </div>
        </aside>
      )}
    </main>
  );
}
