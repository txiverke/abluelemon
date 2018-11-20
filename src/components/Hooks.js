import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return size;
}

function useScrollPosition() {
  const [position, setPosition] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return position;
}

function useVerticalPosition(elem = null) {
  const [position, setPosition] = useState(elem);

  useEffect(() => {
    console.log(elem)
    if (elem) {
      console.log('entra');
      const handleScroll = elem => setPosition(elem.getBoundingClientRect());
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  return position;
}

export { useWindowSize, useScrollPosition, useVerticalPosition };
