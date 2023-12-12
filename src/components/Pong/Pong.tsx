import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { EVENT } from 'src/constants/socketEvent';
import {
  s_ExitGameByGuestCallback,
  s_ExitGameByHostCallback,
  s_FinishGameCallback,
  socket,
} from 'src/utils/socketAPI';

import GameModal from '@pages/Game/components/Modal/GameModal';
import useClientWidthHeight from '@pages/Game/hooks/useClientWidthHeight';

import Modal from '@components/Modal/Modal';

import Background from './components/Background';
import Unit from './components/Unit';

const LayoutBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .game {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .background {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .unit {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

interface GameResult {
  winner: 'host' | 'guest';
  gameId: string;
}

interface Props {
  targetScore: number;
  level: string;
  hostControllerId: string;
  type: 'host' | 'guest';
  sfx: boolean;
}

const Pong = ({ targetScore, level, hostControllerId, type, sfx }: Props) => {
  const layoutRef = useRef<HTMLDivElement>(null);

  const { minLength } = useClientWidthHeight(layoutRef);

  const [showModal, setShowModal] = useState(false);
  const [isUserWinner, setIsUserWinner] = useState(false);

  useEffect(() => {
    socket.on(EVENT.EXIT_GAME_BY_HOST, (gameId: string) => {
      s_ExitGameByHostCallback(gameId);
      setShowModal(true);

      if (type === 'host') {
        setIsUserWinner(false);
      } else {
        setIsUserWinner(true);
      }
    });

    socket.on(EVENT.EXIT_GAME_BY_GUEST, (gameId: string) => {
      s_ExitGameByGuestCallback(gameId);
      setShowModal(true);

      if (type === 'host') {
        setIsUserWinner(true);
      } else {
        setIsUserWinner(false);
      }
    });

    socket.on(EVENT.FINISH_GAME, (gameResult: GameResult) => {
      if (gameResult.winner === type) {
        setIsUserWinner(true);
      }
      setShowModal(true);
      s_FinishGameCallback(gameResult.gameId);
    });

    return () => {
      socket.off(EVENT.EXIT_GAME_BY_HOST);
      socket.off(EVENT.EXIT_GAME_BY_GUEST);
      socket.off(EVENT.FINISH_GAME);
    };
  }, [type]);

  return (
    <LayoutBase ref={layoutRef}>
      {showModal ? (
        <Modal disableBackgroundExit>
          <GameModal win={isUserWinner} />
        </Modal>
      ) : (
        <div className="game">
          <Background
            canvasWidth={minLength}
            canvasHeight={minLength}
            className="background"
          />
          <Unit
            canvasWidth={minLength}
            canvasHeight={minLength}
            targetScore={targetScore}
            level={level}
            hostControllerId={hostControllerId}
            type={type}
            sfx={sfx}
            className="unit"
          />
        </div>
      )}
    </LayoutBase>
  );
};

export default Pong;
