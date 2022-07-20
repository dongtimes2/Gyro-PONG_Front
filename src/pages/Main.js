import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import SocketEvent from '../constants/socket';
import settingState from '../recoil/settingState';
import { playClickSound } from '../utils/playSound';
import { socket } from '../utils/socketAPI';

export default function Main() {
  const [motionValueList, setMotionValueList] = useState([]);
  const setting = useRecoilValue(settingState);

  const navigate = useNavigate();

  const handleButtonSound = (event) => {
    if (
      (event.target.nodeName === 'BUTTON' || event.target.nodeName === 'A') &&
      setting.isPlayingSFX
    ) {
      playClickSound();
    }
  };

  useEffect(() => {
    socket.on(SocketEvent.RECEIVE_MOVE_UP, () => {
      setMotionValueList((prev) => [...prev, '🡹']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_DOWN, () => {
      setMotionValueList((prev) => [...prev, '🡻']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_LEFT, () => {
      setMotionValueList((prev) => [...prev, '🡸']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_RIGHT, () => {
      setMotionValueList((prev) => [...prev, '🡺']);
    });

    socket.on(SocketEvent.RECEIVE_STOP_DETECT_MOTION, () => {
      setMotionValueList([]);
    });

    return () => {
      socket.off(SocketEvent.RECEIVE_MOVE_UP);
      socket.off(SocketEvent.RECEIVE_MOVE_DOWN);
      socket.off(SocketEvent.RECEIVE_MOVE_LEFT);
      socket.off(SocketEvent.RECEIVE_MOVE_RIGHT);
      socket.off(SocketEvent.RECEIVE_STOP_DETECT_MOTION);
    };
  }, []);

  useEffect(() => {
    if (motionValueList[0] === '🡹' && motionValueList[1] === '🡸') {
      setTimeout(() => {
        navigate('/settings');
      }, 500);
    } else if (
      motionValueList[0] === '🡹' &&
      motionValueList[1] === '🡻' &&
      setting.isCompletedMotionSettings
    ) {
      setTimeout(() => {
        navigate('/lobby');
      }, 500);
    } else if (motionValueList[0] === '🡹' && motionValueList[1] === '🡺') {
      setTimeout(() => {
        navigate('/guides');
      }, 500);
    } else if (motionValueList.length >= 2) {
      setMotionValueList([]);
    }
  }, [motionValueList, navigate, setting.isCompletedMotionSettings]);

  const handleGoToLobby = () => {
    navigate('/lobby');
  };

  return (
    <MainWrap onClick={handleButtonSound}>
      <div className="title-area">| Gyro PONG |</div>
      <div className="message-area">
        {!setting.isCompletedMotionSettings && (
          <>
            컨트롤러를 연결하고 움직임 설정까지 마쳐야 게임에 진입할 수 있습니다
          </>
        )}
      </div>
      <div className="button-area">
        <Link to="/settings">
          {setting.isChangedPageByMotion && (
            <span className="arrow-area">&#129145; &#129144;</span>
          )}{' '}
          설정
        </Link>
        <button
          disabled={!setting.isCompletedMotionSettings}
          onClick={handleGoToLobby}
        >
          {setting.isChangedPageByMotion && (
            <span className="arrow-area">&#129145; &#129147;</span>
          )}{' '}
          게임 시작
        </button>
        <Link to="/guides">
          {setting.isChangedPageByMotion && (
            <span className="arrow-area">&#129145; &#129146;</span>
          )}{' '}
          도움말
        </Link>
      </div>
      {setting.isChangedPageByMotion && (
        <>
          <div className="motion-value-area">{motionValueList}</div>
        </>
      )}
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .title-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 67%;
    font-size: 200px;
    white-space: nowrap;
    animation: typing 0.9s steps(5);
    overflow: hidden;
  }

  .message-area {
    display: flex;
    flex-basis: 3%;
    align-items: center;
  }

  .button-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-basis: 25%;
    width: 100%;
  }

  .motion-value-area {
    display: flex;
    align-items: center;
    flex-basis: 5%;
    font-size: 30px;
  }

  .button-area a {
    padding: 20px 50px;
    font-size: 50px;
  }

  .button-area button {
    padding: 20px 50px;
    font-size: 50px;
  }

  .arrow-area {
    font-size: 35px;
  }

  @keyframes typing {
    from {
      width: 0;
    }

    to {
      width: 100%;
    }
  }
`;
