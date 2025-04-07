import { useEffect } from 'react';
import { gsap } from 'gsap';

export const fadeInAnimation = (element) => {
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
};

export const waterRippleAnimation = (element) => {
  gsap.to(element, {
    scale: 1.1,
    duration: 1,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });
};

export const slideInAnimation = (element, direction = 'left') => {
  const distance = direction === 'left' ? '-100%' : '100%';
  gsap.fromTo(element, { x: distance, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
};

export const loadingAnimation = (element) => {
  gsap.to(element, {
    rotation: 360,
    duration: 2,
    repeat: -1,
    ease: 'linear',
  });
};