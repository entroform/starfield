import React, { useLayoutEffect, useRef, useCallback, Ref } from 'react';
import { Viewport } from '@nekobird/rocket';

import styled from 'styled-components';

const CanvasStyled = styled.canvas`
  background-color: black;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
`;

const Canvas = React.forwardRef((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const resizeHandler = () => {
      canvasRef.current!.width = Viewport.width;
      canvasRef.current!.height = Viewport.height;
    }

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  // Merge CanvasRef and forwarded Ref.
  const handleRef = useCallback(
    element => {
      (canvasRef as any).current = element;

      if (!ref) return;

      if (typeof ref === 'function') {
        return ref(element);
      }

      (ref as any).current = element;
    },
    [ref, canvasRef]
  );
  
  return (
    <CanvasStyled ref={handleRef}></CanvasStyled>
  );
})

export default Canvas;