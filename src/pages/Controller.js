import { useRef, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  registerControllerId,
  controllerCompatibilityFailure,
  controllerCompatibilitySuccess,
} from '../utils/socketAPI';

export default function Controller() {
  const isCompatibilityChecked = useRef(false);

  const params = useParams();

  useEffect(() => {
    registerControllerId(params.userId);
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

  const handleActiveButton = () => {
    sensorActivate();
  };

  const handleDeactiveButton = () => {
    sensorDeactivate();
  };

  return (
    <ControllerWrap>
      <button type="button" onClick={handleActiveButton}>
        자이로 센서 활성화
      </button>
      <button type="button" onClick={handleDeactiveButton}>
        자이로 센서 비활성화
      </button>
    </ControllerWrap>
  );
}

const ControllerWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100vw;
  height: 100vh;

  button {
    padding: 30px 30px;
    font-size: 30px;
  }
`;
