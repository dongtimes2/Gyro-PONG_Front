import { useRef, useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ControllerPage } from '../constants/page';
import SocketEvent from '../constants/socket';
import {
  registerControllerId,
  controllerCompatibilityFailure,
  controllerCompatibilitySuccess,
  socket,
  startMotionSetting,
  sendSensorData,
  sendExit,
  switchMotionSettingPage,
  disconnectController,
} from '../utils/socketAPI';

export default function Controller() {
  const [controllerPage, setControllerPage] = useState(ControllerPage.DEFAULT);

  const alpha = useRef(0);
  const beta = useRef(0);
  const gamma = useRef(0);

  const isCompatibilityChecked = useRef(false);

  const params = useParams();

  useEffect(() => {
    registerControllerId(params.userId);

    socket.on(SocketEvent.LOAD_CONTROLLER_SENSOR_ACTIVATE_PAGE, () => {
      setControllerPage(ControllerPage.SENSOR_ACTIVATE);
    });

    socket.on(SocketEvent.LOAD_CONTROLLER_MOTION_SETTING_PAGE, () => {
      setControllerPage(ControllerPage.MOTION_SETTING);
    });

    socket.on(SocketEvent.LOAD_CONTROLLER_LEFT_SETTING_PAGE, () => {
      setControllerPage(ControllerPage.TURN_LEFT);
    });

    socket.on(SocketEvent.LOAD_CONTROLLER_RIGHT_SETTING_PAGE, () => {
      setControllerPage(ControllerPage.TURN_RIGHT);
    });

    socket.on(SocketEvent.LOAD_CONTROLLER_FORWARD_SETTING_PAGE, () => {
      setControllerPage(ControllerPage.HEAD_FORWARD);
    });

    socket.on(SocketEvent.LOAD_CONTROLLER_SETTING_FINISH_PAGE, () => {
      setControllerPage(ControllerPage.SETTING_FINISH);
    });

    socket.on(SocketEvent.LOAD_CONTROLLER_DEFAULT_PAGE, () => {
      setControllerPage(ControllerPage.DEFAULT);
    });

    socket.on(SocketEvent.LOAD_CONTROLLER_CONNECTION_SUCCESS_PAGE, () => {
      setControllerPage(ControllerPage.CONNECTION_SUCCESS);
    });
  }, []);

  const sensorValueSetter = (paramAlpha, paramBeta, paramGamma) => {
    alpha.current = parseInt(paramAlpha);
    beta.current = parseInt(paramBeta);
    gamma.current = parseInt(paramGamma);
  };

  const getCompatibilityCheckHistory = () => {
    return isCompatibilityChecked.current;
  };

  const compatibilityChecked = () => {
    isCompatibilityChecked.current = true;
  };

  const compatibilityChecker = (event) => {
    const result = getCompatibilityCheckHistory();

    if (!result) {
      compatibilityChecked();

      if (!(event.alpha || event.beta || event.gamma)) {
        controllerCompatibilityFailure();
        return;
      } else {
        controllerCompatibilitySuccess();
      }
    }
  };

  const handleOrientation = useCallback((event) => {
    compatibilityChecker(event);
    sensorValueSetter(event.alpha, event.beta, event.gamma);
  }, []);

  const sensorActivate = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined') {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const response = await DeviceOrientationEvent.requestPermission();

        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    } else {
      controllerCompatibilityFailure();
    }
  };

  const sensorDeactivate = () => {
    window.removeEventListener('deviceorientation', handleOrientation);
  };

  const handleActiveButtonClick = () => {
    sensorActivate();
  };

  const handleStartSettingButtonClick = () => {
    startMotionSetting();
  };

  const handleBetaValueSettingButtonClick = () => {
    sendSensorData({ type: controllerPage, value: beta.current });
  };

  const handleGammaValueSettingButtonClick = () => {
    sendSensorData({ type: controllerPage, value: gamma.current });
  };

  const handleActivationExit = () => {
    sendExit();
    disconnectController();
    setControllerPage(ControllerPage.DEFAULT);
  };

  const handleExit = () => {
    sendExit();
    setControllerPage(ControllerPage.DEFAULT);
  };

  const handleSettingMotion = () => {
    switchMotionSettingPage();
    setControllerPage(ControllerPage.MOTION_SETTING);
  };

  return (
    <ControllerWrap>
      {controllerPage === ControllerPage.DEFAULT && (
        <>
          <div className="header">모바일 컨트롤러</div>
        </>
      )}
      {controllerPage === ControllerPage.SENSOR_ACTIVATE && (
        <>
          <div className="header">활성화 버튼을 눌러주세요</div>
          <button type="button" onClick={handleActiveButtonClick}>
            자이로 센서 활성화
          </button>
          <button type="button" onClick={handleActivationExit}>
            나가기
          </button>
        </>
      )}
      {controllerPage === ControllerPage.CONNECTION_SUCCESS && (
        <>
          <div className="header">연결에 성공하였습니다.</div>
          <button type="button" onClick={handleSettingMotion}>
            움직임 범위 설정하기
          </button>
          <button type="button" onClick={handleExit}>
            나가기
          </button>
        </>
      )}
      {controllerPage === ControllerPage.MOTION_SETTING && (
        <>
          <div className="header">시작하기 버튼을 눌러주세요</div>
          <button type="button" onClick={handleStartSettingButtonClick}>
            측정 시작하기
          </button>
          <button type="button" onClick={handleExit}>
            나가기
          </button>
        </>
      )}
      {controllerPage === ControllerPage.TURN_LEFT && (
        <>
          <div className="header">기기를 왼쪽으로 기울여주세요</div>
          <button type="button" onClick={handleBetaValueSettingButtonClick}>
            확인
          </button>
        </>
      )}
      {controllerPage === ControllerPage.TURN_RIGHT && (
        <>
          <div className="header">기기를 오른쪽으로 기울여주세요</div>
          <button type="button" onClick={handleBetaValueSettingButtonClick}>
            확인
          </button>
        </>
      )}
      {controllerPage === ControllerPage.HEAD_FORWARD && (
        <>
          <div className="header">기기를 전방으로 기울여주세요</div>
          <button type="button" onClick={handleGammaValueSettingButtonClick}>
            확인
          </button>
        </>
      )}
      {controllerPage === ControllerPage.SETTING_FINISH && (
        <>
          <div className="header">세팅이 완료되었습니다</div>
          <button type="button" onClick={handleExit}>
            나가기
          </button>
        </>
      )}
    </ControllerWrap>
  );
}

const ControllerWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100vw;
  height: 100vh;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 20%;
    font-size: 40px;
  }

  button {
    padding: 30px 30px;
    font-size: 30px;
  }
`;
