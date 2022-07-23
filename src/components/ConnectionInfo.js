import { useCallback, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import SocketEvent from '../constants/socket';
import settingState from '../recoil/settingState';
import userState from '../recoil/userState';
import controllerUrlGenerator from '../utils/controllerUrlGenerator';
import { playClickSound } from '../utils/playSound';
import {
  disconnectController,
  sendToggleMotionButton,
  socket,
} from '../utils/socketAPI';
import urlCopier from '../utils/urlCopier';

import Qrcode from './Qrcode';

const ConnectionInfo = ({
  isConnected,
  userId,
  isCheckingCompatibility,
  isCompatible,
  onclose,
}) => {
  const [motionValueList, setMotionValueList] = useState([]);
  const user = useRecoilValue(userState);
  const setting = useRecoilValue(settingState);
  const controllerUrl = controllerUrlGenerator(userId);

  const handleDisconnect = useCallback(() => {
    disconnectController({
      sender: 'settingPage',
      controllerId: user.controllerId,
    });
  }, [user.controllerId]);

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
    if (motionValueList[0] === '⇦' && motionValueList[1] === '⇨') {
      handleDisconnect();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList[0] === '⇧' && motionValueList[1] === '⇦') {
      onclose();
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    } else if (motionValueList.length >= 2) {
      setMotionValueList([]);
      sendToggleMotionButton(user.controllerId);
    }
  }, [motionValueList, onclose, user.controllerId, handleDisconnect]);

  const handleCopyLink = () => {
    urlCopier(controllerUrl);
  };

  const handleButtonSound = (event) => {
    if (event.target.nodeName === 'BUTTON' && setting.isPlayingSFX) {
      playClickSound();
    }
  };

  return (
    <ConnectionInfoWrap onClick={handleButtonSound}>
      {isConnected ? (
        <>
          {isCheckingCompatibility && (
            <>
              <div className="header">
                <div>기기를 발견하였습니다.</div>
                <div>자이로센서 활성화 버튼을 눌러주세요.</div>
              </div>
              <div className="icon-area">
                <div> ! </div>
              </div>
            </>
          )}

          {!isCheckingCompatibility &&
            (isCompatible ? (
              <>
                <div className="header">
                  <div>연결에 성공하였습니다.</div>
                </div>
                <div className="icon-area">
                  <div>ok</div>
                </div>
                <div className="motion-value-area">
                  {setting.isChangedPageByMotion && <>{motionValueList}</>}
                </div>
                <div className="button-area">
                  <button type="button" onClick={handleDisconnect}>
                    {setting.isChangedPageByMotion && (
                      <span className="arrow-area">⇦ ⇨</span>
                    )}{' '}
                    기기 연결 끊기
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="header">
                  <div>기기에 자이로센서를 찾을 수 없습니다.</div>
                  <div>
                    연결을 끊고 다시 시도하거나, 다른 기기를 이용해주세요.
                  </div>
                </div>
                <div className="icon-area">
                  <div>error</div>
                </div>
                <div className="button-area">
                  <button type="button" onClick={handleDisconnect}>
                    기기 연결 끊기
                  </button>
                </div>
              </>
            ))}
        </>
      ) : (
        <>
          <div className="header">모바일 기기를 연결해주세요</div>
          <div className="qrcode-area">
            <div>QR CODE</div>
            <Qrcode link={controllerUrl} size={250} />
          </div>
          <div className="link-area">
            <div>LINK</div>
            <div>{controllerUrl}</div>
          </div>
          <div className="button-area">
            <button type="button" onClick={handleCopyLink}>
              링크 복사하기
            </button>
          </div>
        </>
      )}
    </ConnectionInfoWrap>
  );
};

ConnectionInfo.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  isCheckingCompatibility: PropTypes.bool.isRequired,
  isCompatible: PropTypes.bool.isRequired,
  onclose: PropTypes.func.isRequired,
};

const ConnectionInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 15%;
    font-size: 50px;
  }

  .qrcode-area {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-basis: 60%;
    font-size: 30px;
    text-align: center;
  }

  .icon-area {
    display: flex;
    flex-basis: 70%;
    font-size: 150px;
    align-items: center;
  }

  .motion-value-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 5%;
    font-size: 30px;
  }

  .link-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 15%;
    font-size: 30px;
  }

  .button-area {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    flex-basis: 10%;
    height: 80%;
  }

  .button-area button {
    color: #00ff2b;
    font-size: 40px;
    border: 1px solid #00ff2b;
    padding: 0px 50px;
  }

  .button-area button:hover {
    color: black;
    background-color: #00ff2b;
  }

  .button-area button:active {
    background-color: black;
    color: #00ff2b;
  }

  .arrow-area {
    font-size: 30px;
  }
`;

export default ConnectionInfo;
