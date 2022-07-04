import { io } from 'socket.io-client';

import SocketEvent from '../constants/socket';

export const socket = io(process.env.REACT_APP_SERVER_URL);

export const requestUserId = () => {
  socket.emit(SocketEvent.REQUEST_USER_ID);
};

export const registerControllerId = (userId) => {
  socket.emit(SocketEvent.REGISTER_CONTROLLER_ID, userId);
};

export const disconnectController = (userId) => {
  socket.emit(SocketEvent.DISCONNECT_CONTROLLER, userId);
};

export const controllerCompatibilitySuccess = () => {
  socket.emit(SocketEvent.CONTROLLER_COMPATIBILITY_SUCCESS);
};

export const controllerCompatibilityFailure = () => {
  socket.emit(SocketEvent.CONTROLLER_COMPATIBILITY_FAILURE);
};
