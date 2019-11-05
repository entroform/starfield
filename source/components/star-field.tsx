import React, { useEffect, useRef } from 'react';

import { StarsManager } from '../stars/stars-manager';

import Canvas from './canvas';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stars = new StarsManager({
      getCanvasElement: () => canvasRef.current,
    });

    stars.start();

    return () => stars.stop();
  }, []);

  return (
    <div>
      <Canvas ref={canvasRef} />
    </div>
  );
}

export default StarField;