import { useEffect, useState } from 'react';

export default function SayWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    })

    return () => window.removeEventListener('resize', () => {});
  }, []);


  useEffect(() => {
    if (width < 500) document.title = 'Small';
    if (width > 500 && width < 800) document.title = 'medium';
    if (width > 800) document.title = 'large'
  }, [width])

  return <>{width}</>
}