import { useEffect, useState, useRef } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Loading from '../components/Loading';
import ModalPortal from '../components/ModalPortal';
import Modal from '../components/Mordal';
import Pong from '../components/Pong';
import SocketEvent from '../constants/socket';
import settingState from '../recoil/settingState';
import userState from '../recoil/userState';
import {
  playWinSound,
  playloseSound,
  playClickSound,
} from '../utils/playSound';
import {
  sendGameStart,
  sendJoinGame,
  sendRoomIsFull,
  sendRoomIsNotFull,
  sendToggleMotionButton,
  socket,
  userExitGame,
} from '../utils/socketAPI';

export default function Game() {
  const [isUserHost, setIsUserHost] = useState(false);
  const [isAbleToStart, setIsAbleToStart] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isUserWinner, setIsUserWinner] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isForfeit, setIsForfeit] = useState(false);
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [motionValueList, setMotionValueList] = useState([]);
  const user = useRecoilValue(userState);
  const setting = useRecoilValue(settingState);
  const gameRef = useRef(null);

  const naviagte = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getData = (data) => {
      if (data.hostId === user.id) {
        setIsUserHost(true);
      }

      if (data.userList.length === 2) {
        setIsAbleToStart(true);
        sendRoomIsFull(params.gameId);
      } else {
        setIsAbleToStart(false);
        sendRoomIsNotFull(params.gameId);
      }

      setRoomData({ ...data });
    };

    const navigateToLobby = () => {
      naviagte('/lobby');
    };

    const errorHandler = () => {
      setHasErrorOccurred(true);
    };

    const startGame = () => {
      setIsGameStarted(true);
    };

    const receiveHostWin = (data) => {
      if (user.id === data.hostId) {
        setIsUserWinner(true);
        setting.isPlayingSFX && playWinSound();
      } else {
        setting.isPlayingSFX && playloseSound();
      }

      if (data.forfeit) {
        setIsForfeit(true);
      }

      setIsShowingModal(true);
      setIsGameStarted(false);
    };

    const receiveGuestWin = (data) => {
      if (user.id !== data.hostId) {
        setIsUserWinner(true);
        setting.isPlayingSFX && playWinSound();
      } else {
        setting.isPlayingSFX && playloseSound();
      }

      if (data.forfeit) {
        setIsForfeit(true);
      }

      setIsShowingModal(true);
      setIsGameStarted(false);
    };

    setting.isCompletedMotionSettings &&
      sendJoinGame({
        gameId: params.gameId,
        controllerId: user.controllerId,
        width: gameRef.current.offsetWidth,
        height: gameRef.current.offsetHeight,
      });

    socket.on(SocketEvent.RECEIVE_EXIT_GAME, navigateToLobby);
    socket.on(SocketEvent.RECEIVE_JOIN_ERROR, errorHandler);
    socket.on(SocketEvent.RECEIVE_ROOM_DATA, getData);
    socket.on(SocketEvent.RECEIVE_GO_TO_LOBBY, navigateToLobby);
    socket.on(SocketEvent.RECEIVE_GAME_START, startGame);
    socket.on(SocketEvent.RECEIVE_HOST_WIN, receiveHostWin);
    socket.on(SocketEvent.RECEIVE_GUEST_WIN, receiveGuestWin);

    return () => {
      userExitGame(params.gameId);
      socket.off(SocketEvent.RECEIVE_EXIT_GAME, navigateToLobby);
      socket.off(SocketEvent.RECEIVE_JOIN_ERROR, errorHandler);
      socket.off(SocketEvent.RECEIVE_ROOM_DATA, getData);
      socket.off(SocketEvent.RECEIVE_GO_TO_LOBBY, navigateToLobby);
      socket.off(SocketEvent.RECEIVE_GAME_START, startGame);
      socket.off(SocketEvent.RECEIVE_HOST_WIN, receiveHostWin);
      socket.off(SocketEvent.RECEIVE_GUEST_WIN, receiveGuestWin);
    };
  }, [
    params.gameId,
    user.id,
    user.controllerId,
    naviagte,
    setting.isPlayingSFX,
    setting.isCompletedMotionSettings,
  ]);

  useEffect(() => {
    socket.on(SocketEvent.RECEIVE_MOVE_UP, () => {
      setMotionValueList((prev) => [...prev, '⇧']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_DOWN, () => {
      setMotionValueList((prev) => [...prev, '⇩']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_LEFT, () => {
      setMotionValueList((prev) => [...prev, '⇦']);
    });

    socket.on(SocketEvent.RECEIVE_MOVE_RIGHT, () => {
      setMotionValueList((prev) => [...prev, '⇨']);
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
    if (
      !hasErrorOccurred &&
      motionValueList[0] === '⇧' &&
      motionValueList[1] === '⇩'
    ) {
      if (isUserHost && isAbleToStart) {
        setTimeout(() => {
          sendGameStart(params.gameId);
        }, 500);
      }
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '⇧' && motionValueList[1] === '⇦') {
      naviagte('/lobby');
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList.length >= 2) {
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    }
  }, [
    motionValueList,
    isUserHost,
    hasErrorOccurred,
    params.gameId,
    naviagte,
    isAbleToStart,
    user.controllerId,
  ]);

  const handleGuestExit = () => {
    naviagte('/lobby');
  };

  const handleHostExit = () => {
    naviagte('/lobby');
  };

  const handleGameStart = () => {
    sendGameStart(params.gameId);
  };

  const handleCloseModal = () => {
    setIsShowingModal(false);
    isForfeit && naviagte('/lobby');
  };

  const handleButtonSound = (event) => {
    if (
      (event.target.nodeName === 'A' || event.target.nodeName === 'BUTTON') &&
      setting.isPlayingSFX
    ) {
      playClickSound();
    }
  };

  return (
    <>
      <GameWrap ref={gameRef} onClick={handleButtonSound}>
        {hasErrorOccurred || !setting.isCompletedMotionSettings ? (
          <>
            <div className="error-area">
              <div>게임에 입장할 수 없습니다</div>
              <Link to="/lobby">
                {setting.isChangedPageByMotion && (
                  <span className="arrow-area">⇧ ⇦</span>
                )}{' '}
                나가기
              </Link>
            </div>
            {setting.isChangedPageByMotion && (
              <>
                <div className="motion-value-area">{motionValueList}</div>
              </>
            )}
          </>
        ) : (
          <>
            {isGameStarted ? (
              <>
                <Pong
                  roomData={roomData}
                  setting={setting}
                  isUserHost={isUserHost}
                ></Pong>
              </>
            ) : (
              <>
                <div className="waiting-area">
                  {isUserHost ? (
                    <>
                      {isAbleToStart ? (
                        <button type="button" onClick={handleGameStart}>
                          {setting.isChangedPageByMotion && (
                            <span className="arrow-area">⇧ ⇩</span>
                          )}{' '}
                          게임 시작하기
                        </button>
                      ) : (
                        <Loading />
                      )}
                      <button type="button" onClick={handleHostExit}>
                        {setting.isChangedPageByMotion && (
                          <span className="arrow-area">⇧ ⇦</span>
                        )}{' '}
                        방 삭제하고 나가기
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={handleGuestExit}>
                        {setting.isChangedPageByMotion && (
                          <span className="arrow-area">⇧ ⇦</span>
                        )}{' '}
                        나가기
                      </button>
                    </>
                  )}
                </div>
                {setting.isChangedPageByMotion && (
                  <>
                    <div className="motion-value-area">{motionValueList}</div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </GameWrap>

      {isShowingModal && (
        <ModalPortal>
          <Modal onClose={handleCloseModal}>
            <ModalContentWrap>
              <div className="result-area">
                {isUserWinner ? <div>승리</div> : <div>패배</div>}
              </div>
              <div className="button-area">
                <button type="button" onClick={handleCloseModal}>
                  나가기
                </button>
              </div>
            </ModalContentWrap>
          </Modal>
        </ModalPortal>
      )}
    </>
  );
}

const GameWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .waiting-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 95%;
    width: 100%;
    font-size: 50px;
  }

  .waiting-area button {
    font-size: 50px;
    margin: 50px 0;
    padding: 10px 30px;
  }

  .arrow-area {
    font-size: 50px;
  }

  .motion-value-area {
    display: flex;
    justify-content: center;
    flex-basis: 5%;
    font-size: 30px;
  }

  .error-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 95%;
    width: 100%;
    font-size: 50px;
  }

  .error-area a {
    font-size: 50px;
    margin: 50px 0;
    padding: 10px 30px;
  }
`;

const ModalContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: #00ff2b;
  width: 100%;
  height: 100%;

  .result-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 90%;
    font-size: 200px;
  }

  .button-area {
    display: flex;
    justify-content: center;
    flex-basis: 10%;
  }

  .button-area button {
    color: #00ff2b;
    font-size: 40px;
    padding: 0px 50px;
    border: 1px solid #00ff2b;
  }

  .button-area button:hover {
    color: black;
    background-color: #00ff2b;
  }

  .button-area button:active {
    color: #00ff2b;
    background-color: black;
  }
`;
