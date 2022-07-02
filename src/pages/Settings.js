import { useState } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Settings() {
  const [isVibrationMode, setIsVibrationMode] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPlayingSFX, setIsPlayingSFX] = useState(false);
  const [isChangedByMotion, setIsChangedByMotion] = useState(false);

  const handleToggleButtonClick = (event) => {
    switch (event.target.name) {
      case 'vibration':
        setIsVibrationMode((value) => !value);
        break;
      case 'music':
        setIsPlayingMusic((value) => !value);
        break;
      case 'sfx':
        setIsPlayingSFX((value) => !value);
        break;
      case 'motion':
        setIsChangedByMotion((value) => !value);
        break;
      default:
        break;
    }
  };

  return (
    <SettingsWrap>
      <div className="title-area">| Settings |</div>
      <div className="content-area">
        <div className="toggle-button-area">
          <button
            type="button"
            name="vibration"
            onClick={handleToggleButtonClick}
          >
            진동
          </button>
          <div className="status-box">{isVibrationMode ? 'O' : 'X'}</div>
        </div>
        <div className="toggle-button-area">
          <button type="button" name="music" onClick={handleToggleButtonClick}>
            배경음악
          </button>
          <div className="status-box">{isPlayingMusic ? 'O' : 'X'}</div>
        </div>
        <div className="toggle-button-area">
          <button type="button" name="sfx" onClick={handleToggleButtonClick}>
            효과음
          </button>
          <div className="status-box">{isPlayingSFX ? 'O' : 'X'}</div>
        </div>
        <div className="toggle-button-area">
          <button type="button" name="motion" onClick={handleToggleButtonClick}>
            컨트롤러 모션으로 메뉴 이동하기
          </button>
          <div className="status-box">{isChangedByMotion ? 'O' : 'X'}</div>
        </div>
        <button type="button">모바일 컨트롤러 연결 설정</button>
      </div>
      <div className="button-area">
        <Link to="/">메인 화면으로 돌아가기</Link>
      </div>
    </SettingsWrap>
  );
}

const SettingsWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .title-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 15%;
    font-size: 100px;
    white-space: nowrap;
  }

  .content-area {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-basis: 60%;
    width: 65%;
  }

  .button-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 25%;
  }

  .toggle-button-area {
    display: flex;
  }

  .toggle-button-area button {
    flex-basis: 90%;
  }

  .status-box {
    flex-basis: 10%;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    padding: 10px;
    font-size: 40px;
    text-align: center;
  }

  a {
    padding: 20px 50px;
    font-size: 30px;
  }

  button {
    padding: 10px 100px;
    font-size: 40px;
  }
`;
