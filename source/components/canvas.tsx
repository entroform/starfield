import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { Viewport } from '@nekobird/rocket';

import styled from 'styled-components';

const CanvasStyled = styled.canvas`
  background-color: black;
  box-sizing: border-box;
  height: 100vh;
  left: 0;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0;
  width: 100vw;
`;

const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const resizeHandler = () => {
      canvasRef.current!.width = Viewport.width * 2;
      canvasRef.current!.height = Viewport.height * 2;
    }

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

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