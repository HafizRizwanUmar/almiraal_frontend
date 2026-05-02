import React, { Children, cloneElement, forwardRef, isValidElement, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const container = useRef(null);
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const orderRef = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);

  const config = useMemo(() => 
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.2,
          durMove: 1.2,
          durReturn: 1.2,
          promoteOverlap: 0.7,
          returnDelay: 0.1
        }
      : {
          ease: 'power2.inOut',
          durDrop: 0.6,
          durMove: 0.6,
          durReturn: 0.6,
          promoteOverlap: 0.4,
          returnDelay: 0.2
        }, [easing]);

  useGSAP(() => {
    const cards = container.current.querySelectorAll('.card');
    if (!cards.length) return;

    console.log('CardSwap: Initializing with', cards.length, 'cards');

    const total = cards.length;
    
    // Initial Placement
    cards.forEach((el, i) => {
      const slot = makeSlot(i, cardDistance, verticalDistance, total);
      gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skewAmount,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true,
        opacity: 1
      });
    });

    const swap = () => {
      if (orderRef.current.length < 2) return;
      console.log('CardSwap: Swapping...');

      const [frontIdx, ...restIndices] = orderRef.current;
      const elFront = cards[frontIdx];
      const tl = gsap.timeline({
        onComplete: () => {
          orderRef.current = [...restIndices, frontIdx];
        }
      });
      tlRef.current = tl;

      // 1. Drop the front card
      tl.to(elFront, {
        y: '+=150',
        opacity: 0,
        duration: config.durDrop,
        ease: config.ease
      });

      // 2. Promote the rest
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      restIndices.forEach((idx, i) => {
        const el = cards[idx];
        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        }, `promote+=${i * 0.1}`);
      });

      // 3. Return front card to back
      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.set(elFront, { zIndex: backSlot.zIndex }, 'return');
      tl.to(elFront, {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        opacity: 1,
        duration: config.durReturn,
        ease: config.ease
      }, 'return');
    };

    const interval = setInterval(swap, delay);

    if (pauseOnHover) {
      const enter = () => { tlRef.current?.pause(); clearInterval(interval); };
      const leave = () => { tlRef.current?.play(); }; // Note: interval won't restart easily here
      container.current.addEventListener('mouseenter', enter);
      container.current.addEventListener('mouseleave', leave);
      return () => {
        container.current.removeEventListener('mouseenter', enter);
        container.current.removeEventListener('mouseleave', leave);
        clearInterval(interval);
      };
    }

    return () => clearInterval(interval);
  }, { dependencies: [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing], scope: container });

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
