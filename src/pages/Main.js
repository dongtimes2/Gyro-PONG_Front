import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import settingState from '../recoil/settingState';
import playClickSound from '../utils/playClickSound';

export default function Main() {
  const setting = useRecoilValue(settingState);

  const handleButtonSound = (event) => {
    if (event.target.nodeName === 'A' && setting.isPlayingSFX) {
      playClickSound();
    }
  };

  return (
    <MainWrap onClick={handleButtonSound}>
      <div className="title-area">| Gyro PONG |</div>

      <div className="button-area">
        <Link to="/settings">설정</Link>
        <Link to="/lobby">게임 시작</Link>
        <Link to="/guides">도움말</Link>
      </div>
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
    flex-basis: 60%;
    font-size: 200px;
    white-space: nowrap;
    animation: typing 0.9s steps(5);
    overflow: hidden;
  }

  .button-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-basis: 40%;
    width: 80%;
  }

  a {
    padding: 20px 50px;
    font-size: 50px;
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
