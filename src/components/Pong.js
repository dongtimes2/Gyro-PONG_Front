import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import SocketEvent from '../constants/socket';
import { socket } from '../utils/socketAPI';

const Pong = ({ roomData }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const hostPaddleLocation = useRef(0);
  const clientPaddleLocation = useRef(0);
  const width = useRef(0);
  const height = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio ?? 1;
    let requestId = 0;

    width.current = Math.floor(wrapRef.current.clientWidth / 10) * 10;
    height.current = Math.floor(wrapRef.current.clientHeight / 10) * 10;

    canvas.style.width = width.current + 'px';
    canvas.style.height = height.current + 'px';

    canvas.width = width.current * pixelRatio;
    canvas.height = height.current * pixelRatio;

    context.fillStyle = '#00ff2b';

    const paddleLength = canvas.height / 10;

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillRect(
        canvas.width / 20,
        hostPaddleLocation.current,
        30,
        paddleLength,
      );

      context.fillRect(
        canvas.width - canvas.width / 20 - 30,
        clientPaddleLocation.current,
        30,
        paddleLength,
      );

      requestId = requestAnimationFrame(render);
    };

    render();

    const handlePaddleMove = (data) => {
      if (data.userId === roomData.hostId) {
        const result =
          ((canvas.height - paddleLength) /
            (data.leftAngle - data.rightAngle)) *
            data.beta -
          ((canvas.height - paddleLength) * data.rightAngle) /
            (data.leftAngle - data.rightAngle);

        if (result + paddleLength <= canvas.height && result >= 0) {
          hostPaddleLocation.current = result;
        } else if (result + paddleLength > canvas.height) {
          hostPaddleLocation.current = canvas.height - paddleLength;
        } else if (result < 0) {
          hostPaddleLocation.current = 0;
        }
      } else {
        const result =
          ((canvas.height - paddleLength) /
            (data.leftAngle - data.rightAngle)) *
            data.beta -
          ((canvas.height - paddleLength) * data.rightAngle) /
            (data.leftAngle - data.rightAngle);

        if (result + paddleLength <= canvas.height && result >= 0) {
          clientPaddleLocation.current = result;
        } else if (result + paddleLength > canvas.height) {
          clientPaddleLocation.current = canvas.height - paddleLength;
        } else if (result < 0) {
          clientPaddleLocation.current = 0;
        }
      }
    };

    socket.on(SocketEvent.RECEIVE_BETA, handlePaddleMove);

    return () => {
      socket.off(SocketEvent.RECEIVE_BETA, handlePaddleMove);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <CanvasWrap ref={wrapRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrap>
  );
};

const CanvasWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid white;
`;

Pong.propTypes = {
  roomData: PropTypes.object.isRequired,
};

export default Pong;
