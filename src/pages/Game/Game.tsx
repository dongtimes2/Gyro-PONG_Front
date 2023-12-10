import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { EVENT } from 'src/constants/socketEvent';
// import { GameInfo } from 'src/types/game';
import { useUserStore } from 'src/store/user';
import { socket } from 'src/utils/socketAPI';

import Pong from '@components/Pong/Pong';

import Waiting from './components/Waiting';
import useClientWidthHeight from './hooks/useClientWidthHeight';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;

  & > div {
    /* padding: 0 5rem; */
  }
`;

type Type = 'host' | 'guest';
type Step = 'waiting' | 'playing';

interface GameInfo {
  level: string;
  targetScore: number;
  hostControllerId: string;
}

const Game = () => {
  const layoutRef = useRef<HTMLDivElement>(null);

  const { state }: { state: Type } = useLocation();

  const { minLength } = useClientWidthHeight(layoutRef);

  const sfx = useUserStore((state) => state.sfx);

  const [step, setStep] = useState<Step>('waiting');
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    level: '',
    targetScore: 0,
    hostControllerId: '',
  });

  useEffect(() => {
    const handlePreventRefresh = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    const handlePreventGoBack = (event: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href);
      event.preventDefault();
    };

    socket.on(EVENT.START_GAME, (gameInfo: GameInfo) => {
      setGameInfo(gameInfo);
      setStep('playing');
    });

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', handlePreventRefresh);
    window.addEventListener('popstate', handlePreventGoBack);

    return () => {
      socket.off(EVENT.START_GAME);
      window.removeEventListener('beforeunload', handlePreventRefresh);
      window.removeEventListener('popstate', handlePreventGoBack);
    };
  }, [state]);

  return (
    <Layout ref={layoutRef} className="game">
      {step === 'waiting' && <Waiting type={state} />}
      {step === 'playing' &&
        Object.values(gameInfo).reduce((acc, cur) => !!acc || !!cur, false) && (
          <Pong
            canvasWidth={minLength}
            canvasHeight={minLength}
            targetScore={gameInfo.targetScore}
            level={gameInfo.level}
            hostControllerId={gameInfo.hostControllerId}
            type={state}
            sfx={sfx}
          />
        )}
    </Layout>
  );
};

export default Game;
