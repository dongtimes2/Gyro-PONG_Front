import { useEffect, useRef } from 'react';

import { EVENT } from 'src/constants/socketEvent';
import theme from 'src/styles/theme';
import {
  playWallHitSound,
  playPaddleHitSound,
  playExtinctionSound,
} from 'src/utils/playSound';
import {
  s_FinishGame,
  s_SendGameData,
  s_SendSfx,
  s_SendVibration,
  socket,
} from 'src/utils/socketAPI';

import { Ball } from '../class/Ball';
import { Paddle } from '../class/Paddle';

interface Data {
  controllerId: string;
  beta: number;
}

interface GameData {
  ball: {
    x: number;
    y: number;
  };
  score: {
    host: number;
    guest: number;
  };
}

interface Props {
  canvasWidth: number;
  canvasHeight: number;
  targetScore: number;
  level: string;
  hostControllerId: string;
  type: 'host' | 'guest';
  className: string;
  sfx: boolean;
}

const Unit = ({
  canvasWidth,
  canvasHeight,
  targetScore,
  level,
  hostControllerId,
  className,
  type,
  sfx,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostPaddleY = useRef(0);
  const guestPaddleY = useRef(0);
  const ballX = useRef(canvasWidth / 2 - canvasWidth / 80);
  const ballY = useRef(canvasHeight / 2 - canvasWidth / 80);
  const ballDeltaX = useRef(canvasWidth / 190);
  const ballDeltaY = useRef(canvasWidth / 140);
  const hitHostPaddle = useRef(false);
  const hitGuestPaddle = useRef(false);
  const paddleLength = useRef(0);
  const acceleration = useRef(1.1);
  const hostScore = useRef(0);
  const guestScore = useRef(0);

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
    context.textAlign = 'center';
    context.font = '5rem NeoDunggeunmo';

    paddleLength.current =
      level === '쉬움' ? canvasHeight / 5 : canvasHeight / 8;

    let requestId: number;

    const animate = () => {
      requestId = window.requestAnimationFrame(animate);
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const hostPaddle = new Paddle(
        canvasWidth / 20,
        hostPaddleY.current,
        canvasWidth / 40,
        paddleLength.current,
      );

      const guestPaddle = new Paddle(
        canvasWidth - canvasWidth / 20 - canvasWidth / 40,
        guestPaddleY.current,
        canvasWidth / 40,
        paddleLength.current,
      );

      const ball = new Ball(ballX.current, ballY.current, canvasWidth / 40);

      hostPaddle.paint(context);
      guestPaddle.paint(context);
      ball.paint(context);

      context.fillText(
        String(hostScore.current),
        canvasWidth / 4,
        canvasHeight / 4,
      );

      context.fillText(
        String(guestScore.current),
        canvasWidth - canvasWidth / 4,
        canvasHeight / 4,
      );

      if (type === 'host') {
        s_SendGameData({
          ball: {
            x: ballX.current / canvasWidth,
            y: ballY.current / canvasHeight,
          },
          score: {
            host: hostScore.current,
            guest: guestScore.current,
          },
        });

        ballX.current += ballDeltaX.current;
        ballY.current += ballDeltaY.current;

        // 공이 왼쪽 벽에 맞았을 때
        if (ballX.current <= 0) {
          ballX.current = canvasWidth / 2 - canvasWidth / 80;
          ballY.current = canvasHeight / 2 - canvasWidth / 80;
          ballDeltaX.current = canvasWidth / 190;
          ballDeltaY.current = canvasWidth / 140;
          guestScore.current += 1;
          ballDeltaY.current *= -1;
          hitHostPaddle.current = false;
          hitGuestPaddle.current = false;
          s_SendVibration('gs');
          s_SendSfx('extinction');
          sfx && playExtinctionSound();
        }

        // 공이 오른쪽 벽에 맞았을 때
        if (ballX.current + canvasWidth / 40 >= canvasWidth) {
          ballX.current = canvasWidth / 2 - canvasWidth / 80;
          ballY.current = canvasHeight / 2 - canvasWidth / 80;
          ballDeltaX.current = canvasWidth / 190;
          ballDeltaY.current = canvasWidth / 140;
          hostScore.current += 1;
          ballDeltaY.current *= -1;
          hitHostPaddle.current = false;
          hitGuestPaddle.current = false;
          s_SendVibration('hs');
          s_SendSfx('extinction');
          sfx && playExtinctionSound();
        }

        // 공이 위 아래 벽에 맞았을 때
        if (
          ballY.current + canvasWidth / 40 > canvasHeight ||
          ballY.current < 0
        ) {
          ballDeltaY.current *= -1;
          ballDeltaX.current *= acceleration.current;
          ballDeltaY.current *= acceleration.current;
          hitHostPaddle.current = false;
          hitGuestPaddle.current = false;
          s_SendSfx('wall');
          sfx && playWallHitSound();
        }

        if (
          // host paddle 옆면에 맞았을 때
          0.0375 * canvasWidth <= ballX.current &&
          ballX.current <= 0.075 * canvasWidth &&
          hostPaddleY.current <= ballY.current &&
          ballY.current <=
            hostPaddleY.current + paddleLength.current - canvasWidth / 40 &&
          !hitHostPaddle.current
        ) {
          ballDeltaX.current *= -1;
          hitHostPaddle.current = true;
          hitGuestPaddle.current = false;
          s_SendVibration('hp');
          s_SendSfx('paddle');
          sfx && playPaddleHitSound();
          console.log('옆면맞음');
        } else if (
          // host paddle 상단에 맞았을 때
          0.0375 * canvasWidth <= ballX.current &&
          ballX.current <= 0.075 * canvasWidth &&
          hostPaddleY.current - canvasWidth / 40 <= ballY.current &&
          ballY.current <= hostPaddleY.current &&
          !hitHostPaddle.current
        ) {
          ballDeltaX.current *= -1;
          ballDeltaY.current *= -1;
          hitHostPaddle.current = true;
          hitGuestPaddle.current = false;
          s_SendVibration('hp');
          s_SendSfx('paddle');
          sfx && playPaddleHitSound();
          console.log('상단맞음');
        } else if (
          // host paddle 하단에 맞았을 때
          0.0375 * canvasWidth <= ballX.current &&
          ballX.current <= 0.075 * canvasWidth &&
          hostPaddleY.current + paddleLength.current - canvasWidth / 40 <=
            ballY.current &&
          ballY.current <= hostPaddleY.current + paddleLength.current &&
          !hitHostPaddle.current
        ) {
          ballDeltaX.current *= -1;
          ballDeltaY.current *= -1;
          hitHostPaddle.current = true;
          hitGuestPaddle.current = false;
          s_SendVibration('hp');
          s_SendSfx('paddle');
          sfx && playPaddleHitSound();
          console.log('하단맞음');
        }

        if (
          // guest paddle 옆면에 맞았을 때
          0.9 * canvasWidth <= ballX.current &&
          ballX.current <= 0.9375 * canvasWidth &&
          guestPaddleY.current <= ballY.current &&
          ballY.current <=
            guestPaddleY.current + paddleLength.current - canvasWidth / 40 &&
          !hitGuestPaddle.current
        ) {
          ballDeltaX.current *= -1;
          hitHostPaddle.current = false;
          hitGuestPaddle.current = true;
          s_SendVibration('gp');
          s_SendSfx('paddle');
          sfx && playPaddleHitSound();
          console.log('옆면맞음');
        } else if (
          // guest paddle 상단에 맞았을 때
          0.9 * canvasWidth <= ballX.current &&
          ballX.current <= 0.9375 * canvasWidth &&
          guestPaddleY.current - canvasWidth / 40 <= ballY.current &&
          ballY.current <= guestPaddleY.current &&
          !hitGuestPaddle.current
        ) {
          ballDeltaX.current *= -1;
          ballDeltaY.current *= -1;
          hitHostPaddle.current = false;
          hitGuestPaddle.current = true;
          s_SendVibration('gp');
          s_SendSfx('paddle');
          sfx && playPaddleHitSound();
          console.log('상단맞음');
        } else if (
          // guest paddle 하단에 맞았을 때
          0.9 * canvasWidth <= ballX.current &&
          ballX.current <= 0.9375 * canvasWidth &&
          guestPaddleY.current + paddleLength.current - canvasWidth / 40 <=
            ballY.current &&
          ballY.current <= guestPaddleY.current + paddleLength.current &&
          !hitGuestPaddle.current
        ) {
          ballDeltaX.current *= -1;
          ballDeltaY.current *= -1;
          hitHostPaddle.current = false;
          hitGuestPaddle.current = true;
          s_SendVibration('gp');
          s_SendSfx('paddle');
          sfx && playPaddleHitSound();
          console.log('하단맞음');
        }

        // 게임 종료
        if (hostScore.current === targetScore) {
          s_FinishGame('host');
          window.cancelAnimationFrame(requestId);
        } else if (guestScore.current === targetScore) {
          s_FinishGame('guest');
          window.cancelAnimationFrame(requestId);
        }
      }
    };

    animate();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [canvasWidth, canvasHeight, type, targetScore, sfx, level]);

  useEffect(() => {
    socket.on(EVENT.SEND_GAME_DATA, (gameData: GameData) => {
      ballX.current = gameData.ball.x * canvasWidth;
      ballY.current = gameData.ball.y * canvasHeight;
      hostScore.current = gameData.score.host;
      guestScore.current = gameData.score.guest;
    });

    socket.on(EVENT.SEND_GAME_BETA, (data: Data) => {
      const beta = data.beta;

      if (data.controllerId === hostControllerId) {
        if (level === '쉬움') {
          hostPaddleY.current = beta * (canvasHeight * 0.8);
        } else {
          hostPaddleY.current = beta * (canvasHeight * 0.875);
        }
      } else {
        if (level === '쉬움') {
          guestPaddleY.current = beta * (canvasHeight * 0.8);
        } else {
          hostPaddleY.current = beta * (canvasHeight * 0.875);
        }
      }
    });

    socket.on(EVENT.SEND_SFX, (type: 'paddle' | 'wall' | 'extinction') => {
      if (type === 'paddle') {
        sfx && playPaddleHitSound();
      } else if (type === 'wall') {
        sfx && playWallHitSound();
      } else if (type === 'extinction') {
        sfx && playExtinctionSound();
      }
    });

    return () => {
      socket.off(EVENT.SEND_GAME_DATA);
      socket.off(EVENT.SEND_GAME_BETA);
      socket.off(EVENT.SEND_SFX);
    };
  }, [canvasWidth, canvasHeight, hostControllerId, level, type, sfx]);

  return <canvas ref={canvasRef} className={className} />;
};

export default Unit;
