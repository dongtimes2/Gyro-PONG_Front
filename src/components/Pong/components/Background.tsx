import { useEffect, useRef } from 'react';

import theme from 'src/styles/theme';

interface Props {
  canvasWidth: number;
  canvasHeight: number;
  className: string;
}

const Background = ({ canvasWidth, canvasHeight, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    // canvas의 크기를 설정한다.
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);

    // canvas의 스타일 정보를 설정한다.
    context.fillStyle = theme.colors.green;
    context.strokeStyle = theme.colors.green;

    // background를 그린다.
    // 가운데 점선 그리기
    context.beginPath();
    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);
    context.lineWidth = 4;
    context.setLineDash([30]);
    context.stroke();

    // 테두리 그리기
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, canvasHeight);
    context.lineTo(canvasWidth, canvasHeight);
    context.lineTo(canvasWidth, 0);
    context.lineTo(0, 0);
    context.lineWidth = 1;
    context.setLineDash([]);
    context.stroke();
  }, [canvasWidth, canvasHeight]);

  return <canvas ref={canvasRef} className={className} />;
};

export default Background;
