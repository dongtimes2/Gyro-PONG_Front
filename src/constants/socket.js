const SocketEvent = {
  REQUEST_USER_ID: 'requestUserId',
  RECEIVE_USER_ID: 'receiveUserId',
  REGISTER_CONTROLLER_ID: 'registerControllerId',
  RECEIVE_CONTROLLER_ID: 'receiveControllerId',
  DISCONNECT_CONTROLLER: 'disconnectController',
  REMOVE_CONTROLLER: 'removeController',
  CONTROLLER_COMPATIBILITY_SUCCESS: 'controllerCompatibilitySuccess',
  CONTROLLER_COMPATIBILITY_FAILURE: 'controllerCompatibilityFailure',
  CONTROLLER_CONNECTION_SUCCESS: 'controllerConnectionSuccess',
  CONTROLLER_CONNECTION_FAILURE: 'controllerConnectionFailure',
};

Object.freeze(SocketEvent);

export default SocketEvent;
