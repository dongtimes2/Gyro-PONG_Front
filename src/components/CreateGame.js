import { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import SocketEvent from '../constants/socket';
import settingState from '../recoil/settingState';
import userState from '../recoil/userState';
import { playClickSound } from '../utils/playSound';
import { socket, createGame, sendToggleMotionButton } from '../utils/socketAPI';

const CreateGame = ({ onclose }) => {
  const [isNormalMode, setIsNormalMode] = useState(true);
  const [isNormalTargetScore, setIsNormalScore] = useState(true);
  const [motionValueList, setMotionValueList] = useState([]);
  const user = useRecoilValue(userState);
  const setting = useRecoilValue(settingState);

  const navigate = useNavigate();

  const handleChangeLevel = () => {
    setIsNormalMode((prev) => !prev);
  };

  const handleChangeTagetScore = () => {
    setIsNormalScore((prev) => !prev);
  };

  const handleCreateGame = useCallback(() => {
    const gameId = uuidv4();

    createGame({
      registrationOrder: 0,
      gameId,
      hostId: user.id,
      isNormalMode,
      isNormalTargetScore,
      isStarted: false,
      isFull: false,
      isHostInFocus: true,
      userList: [],
      controllerList: [],
      width: Number.MAX_SAFE_INTEGER,
      height: Number.MAX_SAFE_INTEGER,
    });

    navigate(`/game/${gameId}`);
  }, [isNormalMode, isNormalTargetScore, navigate, user.id]);

  const handleButtonSound = (event) => {
    if (event.target.nodeName === 'BUTTON' && setting.isPlayingSFX) {
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
    if (motionValueList[0] === '🡺' && motionValueList[1] === '🡹') {
      handleChangeLevel();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡺' && motionValueList[1] === '🡻') {
      handleChangeTagetScore();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡸' && motionValueList[1] === '🡺') {
      setTimeout(() => {
        handleCreateGame();
      }, 100);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡹' && motionValueList[1] === '🡸') {
      setTimeout(() => {
        onclose(false);
      }, 100);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList.length >= 2) {
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    }
  }, [motionValueList, navigate, handleCreateGame, onclose, user.controllerId]);

  return (
    <CreateGameWrap onClick={handleButtonSound}>
      <div className="title-area">| CREATE GAME |</div>
      <div className="type-area">
        <div className="toggle-button-area">
          <div>
            {setting.isChangedPageByMotion && (
              <span className="arrow-area">⇨ ⇧</span>
            )}{' '}
            난이도
          </div>
          <button
            type="button"
            className="status-box"
            onClick={handleChangeLevel}
          >
            {isNormalMode ? '보통' : '어려움'}
          </button>
        </div>
        <div className="toggle-button-area">
          <div>
            {setting.isChangedPageByMotion && (
              <span className="arrow-area">⇨ ⇩</span>
            )}{' '}
            목표 점수
          </div>
          <button
            type="button"
            className="status-box"
            onClick={handleChangeTagetScore}
          >
            {isNormalTargetScore ? '11점' : '21점'}
          </button>
        </div>
      </div>
      <div className="motion-value-area">
        {setting.isChangedPageByMotion && <>{motionValueList}</>}
      </div>
      <div className="start-button-area">
        <button type="button" onClick={handleCreateGame}>
          {setting.isChangedPageByMotion && (
            <span className="arrow-area">⇦ ⇨</span>
          )}{' '}
          게임 생성
        </button>
      </div>
    </CreateGameWrap>
  );
};

CreateGame.propTypes = {
  onclose: PropTypes.func.isRequired,
};

const CreateGameWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .title-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 15%;
    font-size: 70px;
  }

  .type-area {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-basis: 60%;
  }

  .motion-value-area {
    display: flex;
    justify-content: center;
    flex-basis: 5%;
    font-size: 30px;
  }

  .start-button-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 20%;
  }

  .toggle-button-area {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle-button-area div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-basis: 40%;
    font-size: 60px;
    border-top: 1px solid #00ff2b;
    border-left: 1px solid #00ff2b;
    border-bottom: 1px solid #00ff2b;
    padding: 5px 0;
  }

  .toggle-button-area button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 60%;
    font-size: 60px;
    padding: 5px 0;
  }

  .start-button-area button {
    font-size: 40px;
    padding: 5px 60px;
  }

  .arrow-area {
    font-size: 30px;
  }
`;

export default CreateGame;
