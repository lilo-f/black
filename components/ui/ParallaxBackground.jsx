import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/ParallaxBackground.css'
gsap.registerPlugin(ScrollTrigger);

const ParallaxBackground = ({ imageUrl, children }) => {
  const parallaxRef = useRef();

  useEffect(() => {
    gsap.to(parallaxRef.current, {
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 30,
      ease: 'none'
    });
  }, []);

  return (
    <div 
      ref={parallaxRef}
      className="parallax-background"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;