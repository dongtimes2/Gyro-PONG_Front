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

    socket.on(SocketEvent.LOAD_CONTROLLER_DEFAULT_PAGE, () => {
      setControllerPage(ControllerPage.DEFAULT);
    });
  }, []);

  const handleOrientation = useCallback((event) => {
    if (!isCompatibilityChecked.current) {
      isCompatibilityChecked.current = true;

      if (!(event.alpha || event.beta || event.gamma)) {
        controllerCompatibilityFailure();
        return;
      } else {
        controllerCompatibilitySuccess();
      }
    }

    alpha.current = parseInt(event.alpha);
    beta.current = parseInt(event.beta);
    gamma.current = parseInt(event.gamma);

    socket.emit('sensor', alpha.current);
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

  const handleDeactiveButtonClick = () => {
    sensorDeactivate();
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

  return (
    <ControllerWrap>
      {controllerPage === ControllerPage.DEFAULT && (
        <>
          <div className="header">모바일 컨트롤러</div>
        </>
      )}
      {controllerPage === ControllerPage.SENSOR_ACTIVATE && (
        <>
          <button type="button" onClick={handleActiveButtonClick}>
            자이로 센서 활성화
          </button>
          <button type="button" onClick={handleDeactiveButtonClick}>
            자이로 센서 비활성화
          </button>
        </>
      )}
      {controllerPage === ControllerPage.MOTION_SETTING && (
        <button type="button" onClick={handleStartSettingButtonClick}>
          측정 시작하기
        </button>
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
