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

export const createGame = (data) => {
  socket.emit(SocketEvent.CREATE_GAME, data);
};

export const requestGameList = () => {
  socket.emit(SocketEvent.REQUEST_GAME_ROOM_LIST);
};

export const sendJoinGame = (data) => {
  socket.emit(SocketEvent.SEND_JOIN_GAME, data);
};

export const sendGuestExitGame = (gameId) => {
  socket.emit(SocketEvent.SEND_GUEST_EXIT_GAME, gameId);
};

export const sendHostExitGame = (gameId) => {
  socket.emit(SocketEvent.SEND_HOST_EXIT_GAME, gameId);
};

export const sendGameStart = (gameId) => {
  socket.emit(SocketEvent.SEND_GAME_START, gameId);
};

export const sendControllerJoinGame = (gameId) => {
  socket.emit(SocketEvent.SEND_CONTROLLER_JOIN_GAME, gameId);
};

export const sendAlpha = (alpha) => {
  socket.emit(SocketEvent.SEND_ALPHA, alpha);
};

export const sendBeta = (beta) => {
  socket.emit(SocketEvent.SEND_BETA, beta);
};

export const sendGamma = (gamma) => {
  socket.emit(SocketEvent.SEND_GAMMA, gamma);
};
