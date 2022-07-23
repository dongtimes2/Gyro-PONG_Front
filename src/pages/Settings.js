import { useEffect, useState, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ConnectionInfo from '../components/ConnectionInfo';
import ModalPortal from '../components/ModalPortal';
import Modal from '../components/Mordal';
import MotionSetting from '../components/MotionSetting';
import { ModalContentPage } from '../constants/page';
import SocketEvent from '../constants/socket';
import settingState from '../recoil/settingState';
import userState from '../recoil/userState';
import { playClickSound, musicController } from '../utils/playSound';
import {
  sendMotionChangingModeState,
  sendToggleMotionButton,
  socket,
} from '../utils/socketAPI';

export default function Settings() {
  const [setting, setSetting] = useRecoilState(settingState);
  const user = useRecoilValue(userState);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [modalContentPage, setModalContentPage] = useState('');
  const [motionValueList, setMotionValueList] = useState([]);

  const navigate = useNavigate();

  const handleToggleButton = (event) => {
    switch (event.target.name) {
      case 'vibration':
        setSetting((prev) => {
          return { ...prev, isVibrationMode: !prev.isVibrationMode };
        });
        break;
      case 'music':
        setSetting((prev) => {
          return { ...prev, isPlayingMusic: !prev.isPlayingMusic };
        });
        break;
      case 'sfx':
        setSetting((prev) => {
          return { ...prev, isPlayingSFX: !prev.isPlayingSFX };
        });
        break;
      case 'motion':
        setSetting((prev) => {
          return {
            ...prev,
            isChangedPageByMotion: !prev.isChangedPageByMotion,
          };
        });
        break;
      default:
        break;
    }
  };

  const handleCloseModal = useCallback(() => {
    if (setting.isPlayingSFX) {
      playClickSound();
    }

    setModalContentPage('');
    setIsShowingModal(false);
  }, [setting.isPlayingSFX]);

  const handleSetConnection = () => {
    setModalContentPage(ModalContentPage.CONNECTION);
    setIsShowingModal(true);
  };

  const handleSetMotion = () => {
    setModalContentPage(ModalContentPage.MOTION);
    setIsShowingModal(true);
  };

  const handleButtonSound = (event) => {
    if (
      (event.target.nodeName === 'BUTTON' || event.target.nodeName === 'A') &&
      setting.isPlayingSFX
    ) {
      playClickSound();
    }
  };

  useEffect(() => {
    setting.isCompatible &&
      sendMotionChangingModeState({
        state: setting.isChangedPageByMotion,
        controllerId: user.controllerId,
      });
  }, [setting.isChangedPageByMotion, setting.isCompatible, user.controllerId]);

  useEffect(() => {
    if (!isShowingModal) {
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
    }

    socket.on(SocketEvent.RECEIVE_EXIT, () => {
      handleCloseModal();
    });

    socket.on(SocketEvent.RECEIVE_SWITCH_MOTION_SETTING_PAGE, () => {
      handleSetMotion();
    });

    return () => {
      socket.off(SocketEvent.RECEIVE_EXIT);
      socket.off(SocketEvent.RECEIVE_SWITCH_MOTION_SETTING_PAGE);
      socket.off(SocketEvent.RECEIVE_MOVE_UP);
      socket.off(SocketEvent.RECEIVE_MOVE_DOWN);
      socket.off(SocketEvent.RECEIVE_MOVE_LEFT);
      socket.off(SocketEvent.RECEIVE_MOVE_RIGHT);
      socket.off(SocketEvent.RECEIVE_STOP_DETECT_MOTION);
    };
  }, [handleCloseModal, isShowingModal]);

  useEffect(() => {
    if (motionValueList[0] === '🡻' && motionValueList[1] === '🡺') {
      setTimeout(() => {
        navigate('/');
      }, 500);
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡹' && motionValueList[1] === '🡸') {
      handleSetConnection();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡹' && motionValueList[1] === '🡺') {
      handleSetMotion();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡺' && motionValueList[1] === '🡹') {
      setSetting((prev) => {
        return { ...prev, isVibrationMode: !prev.isVibrationMode };
      });
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡺' && motionValueList[1] === '🡸') {
      setSetting((prev) => {
        return { ...prev, isPlayingMusic: !prev.isPlayingMusic };
      });
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '🡺' && motionValueList[1] === '🡻') {
      setSetting((prev) => {
        return { ...prev, isPlayingSFX: !prev.isPlayingSFX };
      });
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList.length >= 2) {
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    }
  }, [motionValueList, navigate, user.controllerId, setSetting]);

  musicController(setting.isPlayingMusic);

  return (
    <>
      <SettingsWrap onClick={handleButtonSound}>
        <div className="title-area">| Settings |</div>
        <div className="content-area">
          <div className="toggle-button-area">
            <button type="button" name="vibration" onClick={handleToggleButton}>
              {setting.isChangedPageByMotion && (
                <span className="arrow-area">⇨ ⇧</span>
              )}{' '}
              진동
            </button>
            <div className="status-box" data-testid="vibration">
              {setting.isVibrationMode ? 'O' : 'X'}
            </div>
          </div>
          <div className="toggle-button-area">
            <button type="button" name="music" onClick={handleToggleButton}>
              {setting.isChangedPageByMotion && (
                <span className="arrow-area">⇨ ⇦</span>
              )}{' '}
              배경음악
            </button>
            <div className="status-box" data-testid="music">
              {setting.isPlayingMusic ? 'O' : 'X'}
            </div>
          </div>
          <div className="toggle-button-area">
            <button type="button" name="sfx" onClick={handleToggleButton}>
              {setting.isChangedPageByMotion && (
                <span className="arrow-area">⇨ ⇩</span>
              )}{' '}
              효과음
            </button>
            <div className="status-box" data-testid="sfx">
              {setting.isPlayingSFX ? 'O' : 'X'}
            </div>
          </div>
          {setting.isCompletedMotionSettings && (
            <div className="toggle-button-area">
              <button type="button" name="motion" onClick={handleToggleButton}>
                컨트롤러 움직임으로 메뉴 이동하기
              </button>
              <div className="status-box" data-testid="motion">
                {setting.isChangedPageByMotion ? 'O' : 'X'}
              </div>
            </div>
          )}
          <button type="button" onClick={handleSetConnection}>
            {setting.isChangedPageByMotion && (
              <span className="arrow-area">⇧ ⇦</span>
            )}{' '}
            컨트롤러 연결 설정
          </button>
          {setting.isCompatible && (
            <button type="button" onClick={handleSetMotion}>
              {setting.isChangedPageByMotion && (
                <span className="arrow-area">⇧ ⇨</span>
              )}{' '}
              컨트롤러 움직임 범위 설정
            </button>
          )}
        </div>
        <div className="button-area">
          <Link to="/">
            {setting.isChangedPageByMotion && (
              <span className="arrow-area">⇩ ⇨</span>
            )}{' '}
            메인 화면으로 돌아가기
          </Link>
        </div>
        {setting.isChangedPageByMotion && (
          <>
            <div className="motion-value-area">{motionValueList}</div>
          </>
        )}
      </SettingsWrap>

      {isShowingModal && (
        <ModalPortal>
          <Modal onClose={handleCloseModal}>
            <ModalContentWrap>
              {modalContentPage === ModalContentPage.CONNECTION && (
                <ConnectionInfo
                  isConnected={Boolean(user.controllerId)}
                  userId={user.id}
                  isCheckingCompatibility={setting.isCheckingCompatibility}
                  isCompatible={setting.isCompatible}
                  onclose={handleCloseModal}
                />
              )}
              {modalContentPage === ModalContentPage.MOTION && (
                <MotionSetting />
              )}
              <div className="button-area">
                <button type="button" onClick={handleCloseModal}>
                  {setting.isChangedPageByMotion && (
                    <span className="arrow-area">⇧ ⇦</span>
                  )}{' '}
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
  color: #00ff2b;
  width: 100%;
  height: 100%;

  .button-area {
    display: flex;
    justify-content: center;
    flex-basis: 6%;
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

  .arrow-area {
    font-size: 30px;
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
    flex-basis: 15%;
  }

  .motion-value-area {
    display: flex;
    align-items: center;
    flex-basis: 10%;
    font-size: 30px;
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
    border-top: 1px solid #00ff2b;
    border-bottom: 1px solid #00ff2b;
    border-right: 1px solid #00ff2b;
    padding: 10px;
    font-size: 40px;
  }

  .button-area a {
    padding: 20px 50px;
    font-size: 30px;
  }

  button {
    padding: 10px 100px;
    font-size: 40px;
  }

  .arrow-area {
    font-size: 30px;
  }
`;
