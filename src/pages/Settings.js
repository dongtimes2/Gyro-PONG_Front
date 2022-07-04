import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ConnectionInfo from '../components/ConnectionInfo';
import ModalPortal from '../components/ModalPortal';
import Modal from '../components/Mordal';
import MotionSetting from '../components/MotionSetting';
import { ModalContentPage } from '../constants/page';
import settingState from '../recoil/settingState';
import userState from '../recoil/userState';

export default function Settings() {
  const [setting, setSetting] = useRecoilState(settingState);
  const user = useRecoilValue(userState);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [modalContentPage, setModalContentPage] = useState('');

  const handleToggleButtonClick = (event) => {
    switch (event.target.name) {
      case 'vibration':
        setSetting({
          ...setting,
          isVibrationMode: !setting.isVibrationMode,
        });
        break;
      case 'music':
        setSetting({
          ...setting,
          isPlayingMusic: !setting.isPlayingMusic,
        });
        break;
      case 'sfx':
        setSetting({
          ...setting,
          isPlayingSFX: !setting.isPlayingSFX,
        });
        break;
      case 'motion':
        setSetting({
          ...setting,
          isChangedPageByMotion: !setting.isChangedPageByMotion,
        });
        break;
      default:
        break;
    }
  };

  const handleCloseModalButtonClick = () => {
    setModalContentPage('');
    setIsShowingModal(false);
  };

  const handleConnectionButtonClick = () => {
    setModalContentPage(ModalContentPage.CONNECTION);
    setIsShowingModal(true);
  };

  const handleMotionButtonClick = () => {
    setModalContentPage(ModalContentPage.MOTION);
    setIsShowingModal(true);
  };

  return (
    <>
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
              <div className="sub-text">(아이폰 지원 불가)</div>
            </button>
            <div className="status-box">
              {setting.isVibrationMode ? 'O' : 'X'}
            </div>
          </div>
          <div className="toggle-button-area">
            <button
              type="button"
              name="music"
              onClick={handleToggleButtonClick}
            >
              배경음악
            </button>
            <div className="status-box">
              {setting.isPlayingMusic ? 'O' : 'X'}
            </div>
          </div>
          <div className="toggle-button-area">
            <button type="button" name="sfx" onClick={handleToggleButtonClick}>
              효과음
            </button>
            <div className="status-box">{setting.isPlayingSFX ? 'O' : 'X'}</div>
          </div>
          <div className="toggle-button-area">
            <button
              type="button"
              name="motion"
              onClick={handleToggleButtonClick}
            >
              컨트롤러 움직임으로 메뉴 이동하기
            </button>
            <div className="status-box">
              {setting.isChangedPageByMotion ? 'O' : 'X'}
            </div>
          </div>
          <button type="button" onClick={handleConnectionButtonClick}>
            컨트롤러 연결 설정
          </button>
          {setting.isCompatible && (
            <button type="button" onClick={handleMotionButtonClick}>
              컨트롤러 움직임 범위 설정
            </button>
          )}
        </div>
        <div className="button-area">
          <Link to="/">메인 화면으로 돌아가기</Link>
        </div>
      </SettingsWrap>

      {isShowingModal && (
        <ModalPortal>
          <Modal onClose={handleCloseModalButtonClick}>
            <ModalContentWrap>
              {modalContentPage === ModalContentPage.CONNECTION && (
                <ConnectionInfo
                  isConnected={Boolean(user.controllerId)}
                  userId={user.id}
                  isCheckingCompatibility={setting.isCheckingCompatibility}
                  isCompatible={setting.isCompatible}
                />
              )}
              {modalContentPage === ModalContentPage.MOTION && (
                <MotionSetting />
              )}
              <div className="button-area">
                <button type="button" onClick={handleCloseModalButtonClick}>
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

const ModalContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100%;
  height: 100%;

  .button-area {
    display: flex;
    justify-content: center;
    flex-basis: 6%;
  }

  .button-area button {
    color: black;
    font-size: 40px;
    padding: 0px 50px;
    border: 1px solid black;
  }

  .button-area button:hover {
    color: white;
    background-color: black;
  }

  .button-area button:active {
    color: #3b3b3b;
  }
`;

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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 10%;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    padding: 10px;
    font-size: 40px;
  }

  .sub-text {
    font-size: 20px;
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
