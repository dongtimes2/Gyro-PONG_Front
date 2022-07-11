import { useEffect, useState } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Loading from '../components/Loading';
import ModalPortal from '../components/ModalPortal';
import Modal from '../components/Mordal';
import Pong from '../components/Pong';
import SocketEvent from '../constants/socket';
import userState from '../recoil/userState';
import {
  sendGameStart,
  sendJoinGame,
  socket,
  userExitGame,
} from '../utils/socketAPI';

export default function Game() {
  const [isUserHost, setIsUserHost] = useState(false);
  const [isAbleToStart, setIsAbleToStart] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isUserWinner, setIsUserWinner] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
  const [roomData, setRoomData] = useState({});
  const user = useRecoilValue(userState);

  const naviagte = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getData = (data) => {
      if (data.hostId === user.id) {
        setIsUserHost(true);
      }

      if (data.userList.length === 2) {
        setIsAbleToStart(true);
        socket.emit(SocketEvent.SEND_ROOM_IS_FULL, params.gameId);
      } else {
        setIsAbleToStart(false);
        socket.emit(SocketEvent.SEND_ROOM_IS_NOT_FULL, params.gameId);
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

    const receiveHostWin = (hostId) => {
      if (user.id === hostId) {
        setIsUserWinner(true);
      }

      setIsShowingModal(true);
      setIsGameStarted(false);
    };

    const receiveGuestWin = (hostId) => {
      if (user.id !== hostId) {
        setIsUserWinner(true);
      }

      setIsShowingModal(true);
      setIsGameStarted(false);
    };

    sendJoinGame({
      gameId: params.gameId,
      controllerId: user.controllerId,
    });

    socket.on(SocketEvent.RECEIVE_JOIN_ERROR, errorHandler);
    socket.on(SocketEvent.RECEIVE_ROOM_DATA, getData);
    socket.on(SocketEvent.RECEIVE_GO_TO_LOBBY, navigateToLobby);
    socket.on(SocketEvent.RECEIVE_GAME_START, startGame);
    socket.on(SocketEvent.RECEIVE_HOST_WIN, receiveHostWin);
    socket.on(SocketEvent.RECEIVE_GUEST_WIN, receiveGuestWin);

    return () => {
      userExitGame(params.gameId);
      socket.off(SocketEvent.RECEIVE_JOIN_ERROR, errorHandler);
      socket.off(SocketEvent.RECEIVE_ROOM_DATA, getData);
      socket.off(SocketEvent.RECEIVE_GO_TO_LOBBY, navigateToLobby);
      socket.off(SocketEvent.RECEIVE_GAME_START, startGame);
      socket.off(SocketEvent.RECEIVE_HOST_WIN, receiveHostWin);
      socket.off(SocketEvent.RECEIVE_GUEST_WIN, receiveGuestWin);
    };
  }, [params.gameId, user.id, user.controllerId, naviagte]);

  const guestLeft = () => {
    naviagte('/lobby');
  };

  const hostLeft = () => {
    naviagte('/lobby');
  };

  const handleGameStart = () => {
    sendGameStart(params.gameId);
  };

  const handleCloseModal = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <GameWrap>
        {hasErrorOccurred ? (
          <div className="error-area">
            <div>게임에 입장할 수 없습니다</div>
            <Link to="/lobby">나가기</Link>
          </div>
        ) : (
          <>
            {isGameStarted ? (
              <>
                <div className="title-area">PONG</div>
                <Pong roomData={roomData}></Pong>
              </>
            ) : (
              <div className="waiting-area">
                {isUserHost ? (
                  <>
                    {isAbleToStart ? (
                      <button onClick={handleGameStart}>게임 시작하기</button>
                    ) : (
                      <Loading />
                    )}
                    <button onClick={hostLeft}>방 삭제하고 나가기</button>
                  </>
                ) : (
                  <>
                    <button onClick={guestLeft}>나가기</button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </GameWrap>

      {isShowingModal && (
        <ModalPortal>
          <Modal onClose={setIsShowingModal}>
            <ModalContentWrap>
              <div className="result-area">
                {isUserWinner ? <div>YOU WIN</div> : <div>YOU LOSE</div>}
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

  .title-area {
    font-size: 50px;
  }

  .waiting-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    font-size: 50px;
  }

  .waiting-area button {
    font-size: 50px;
    margin: 50px 0;
    padding: 10px 30px;
  }

  .error-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
