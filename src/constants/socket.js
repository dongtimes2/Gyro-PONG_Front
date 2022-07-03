const SocketEvent = {
  REQUEST_USER_ID: 'requestUserId',
  RECEIVE_USER_ID: 'receiveUserId',
  REGISTER_CONTROLLER_ID: 'registerControllerId',
  RECEIVE_CONTROLLER_ID: 'receiveControllerId',
  DISCONNECT_CONTROLLER: 'disconnectController',
  REMOVE_CONTROLLER: 'removeController',
};

Object.freeze(Event);

export default SocketEvent;
