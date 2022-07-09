import { useEffect, useState } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Pong from '../components/Pong';
import SocketEvent from '../constants/socket';
import userState from '../recoil/userState';
import {
  sendGameStart,
  sendGuestExitGame,
  sendHostExitGame,
  sendJoinGame,
  socket,
} from '../utils/socketAPI';

export default function Game() {
  const [isUserHost, setIsUserHost] = useState(false);
  const [isAbleToStart, setIsAbleToStart] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
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

    sendJoinGame({
      gameId: params.gameId,
      controllerId: user.controllerId,
    });

    socket.on(SocketEvent.RECEIVE_JOIN_ERROR, errorHandler);
    socket.on(SocketEvent.RECEIVE_ROOM_DATA, getData);
    socket.on(SocketEvent.RECEIVE_GO_TO_LOBBY, navigateToLobby);
    socket.on(SocketEvent.RECEIVE_GAME_START, startGame);

    return () => {
      socket.off(SocketEvent.RECEIVE_JOIN_ERROR, errorHandler);
      socket.off(SocketEvent.RECEIVE_ROOM_DATA, getData);
      socket.off(SocketEvent.RECEIVE_GO_TO_LOBBY, navigateToLobby);
      socket.off(SocketEvent.RECEIVE_GAME_START, startGame);
    };
  }, []);

  const guestLeft = () => {
    sendGuestExitGame(params.gameId);
    naviagte('/lobby');
  };

  const hostLeft = () => {
    sendHostExitGame(params.gameId);
    naviagte('/lobby');
  };

  const handleGameStart = () => {
    sendGameStart(params.gameId);
  };

  return (
    <GameWrap>
      <div>This is Game</div>
      {hasErrorOccurred ? (
        <>
          <div>게임에 입장할 수 없습니다</div>
          <Link to="/lobby">나가기</Link>
        </>
      ) : (
        <>
          {isGameStarted ? (
            <>
              <div>게임시작</div>
              <Pong roomData={roomData}></Pong>
            </>
          ) : (
            <>
              {isUserHost ? (
                <>
                  {isAbleToStart && (
                    <button onClick={handleGameStart}>게임 시작하기</button>
                  )}
                  <button onClick={hostLeft}>방 삭제하고 나가기</button>
                </>
              ) : (
                <>
                  <button onClick={guestLeft}>나가기</button>
                </>
              )}
            </>
          )}
        </>
      )}
    </GameWrap>
  );
}

const GameWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
