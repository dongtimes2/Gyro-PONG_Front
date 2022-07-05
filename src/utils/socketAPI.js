import { io } from 'socket.io-client';

import SocketEvent from '../constants/socket';

export const socket = io(process.env.REACT_APP_SERVER_URL);

export const requestUserId = () => {
  socket.emit(SocketEvent.REQUEST_USER_ID);
};

export const registerControllerId = (userId) => {
  socket.emit(SocketEvent.REGISTER_CONTROLLER_ID, userId);
};

export const disconnectController = () => {
  socket.emit(SocketEvent.DISCONNECT_CONTROLLER);
};

export const controllerCompatibilitySuccess = () => {
  socket.emit(SocketEvent.CONTROLLER_COMPATIBILITY_SUCCESS);
};

export const controllerCompatibilityFailure = () => {
  socket.emit(SocketEvent.CONTROLLER_COMPATIBILITY_FAILURE);
};

export const enterMotionSettingPage = (deviceId) => {
  socket.emit(SocketEvent.ENTER_MOTION_SETTING_PAGE, deviceId);
};

export const startMotionSetting = () => {
  socket.emit(SocketEvent.START_MOTION_SETTING);
};

export const sendSensorData = (data) => {
  socket.emit(SocketEvent.SEND_SENSOR_DATA, data);
};

export const sendExit = () => {
  socket.emit(SocketEvent.SEND_EXIT);
};

export const switchMotionSettingPage = () => {
  socket.emit(SocketEvent.SWITCH_MOTION_SETTING_PAGE);
};
