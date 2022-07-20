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
  ENTER_CONTROLLER_MOTION_SETTING_PAGE: 'enterControllerMotionSettingPage',
  LOAD_CONTROLLER_MOTION_SETTING_PAGE: 'loadControllerMotionSettingPage',
  LOAD_CONTROLLER_LEFT_SETTING_PAGE: 'loadControllerLeftSettingPage',
  LOAD_CONTROLLER_RIGHT_SETTING_PAGE: 'loadControllerRightSettingPage',
  LOAD_CONTROLLER_DEFAULT_PAGE: 'loadControllerDefaultPage',
  LOAD_CONTROLLER_SENSOR_ACTIVATE_PAGE: 'loadControllerSensorActivatePage',
  LOAD_CONTROLLER_SETTING_FINISH_PAGE: 'loadControllerSettingFinishPage',
  LOAD_CONTROLLER_CONNECTION_SUCCESS_PAGE:
    'loadControllerConnectionSuccessPage',
  START_MOTION_SETTING: 'startMotionSetting',
  SEND_SENSOR_DATA: 'sendSensorData',
  RECEIVE_MOTION_SETTING_BEGIN: 'receiveMotionSettingBegin',
  RECEIVE_LEFT_DATA: 'receiveLeftData',
  RECEIVE_RIGHT_DATA: 'receiveRightData',
  SEND_EXIT: 'sendExit',
  RECEIVE_EXIT: 'receiveExit',
  SWITCH_MOTION_SETTING_PAGE: 'switchMotionSettingPage',
  RECEIVE_SWITCH_MOTION_SETTING_PAGE: 'receiveSwitchMotionSettingPage',
  CREATE_GAME: 'createGame',
  REQUEST_GAME_ROOM_LIST: 'requestGameRoomList',
  RECEIVE_GAME_ROOM_LIST: 'receiveGameRoomList',
  RECEIVE_BETA: 'receiveBeta',
  SEND_ROOM_IS_FULL: 'sendRoomIsFull',
  SEND_ROOM_IS_NOT_FULL: 'sendRoomIsNotFull',
  SEND_JOIN_GAME: 'sendJoinGame',
  RECEIVE_JOIN_ERROR: 'receiveJoinError',
  RECEIVE_ROOM_DATA: 'receiveRoomData',
  RECEIVE_GO_TO_LOBBY: 'receiveGoToLobby',
  RECEIVE_GAME_START: 'receiveGameStart',
  SEND_GAME_START: 'sendGameStart',
  RECEIVE_GAME_ID: 'receiveGameId',
  SEND_CONTROLLER_JOIN_GAME: 'sendControllerJoinGame',
  SEND_BETA: 'sendBeta',
  SEND_HOST_WIN: 'sendHostWin',
  SEND_GUEST_WIN: 'sendGuestWin',
  RECEIVE_HOST_WIN: 'receiveHostWin',
  RECEIVE_GUEST_WIN: 'receiveGuestWin',
  USER_EXIT_GAME: 'userExitGame',
  SEND_RESIZE_EVENT: 'sendResizeEvent',
  RECEIVE_PADDLE_VIBRATION: 'receivePaddleVibration',
  RECEIVE_WIN_VIBRATION: 'receiveWinVibration',
  RECEIVE_LOSE_VIBRATION: 'receiveLoseVibration',
  SEND_GUEST_WIN_VIBRATION: 'sendGuestWinVibration',
  SEND_GUEST_LOSE_VIBRATION: 'sendGuestLoseVibration',
  SEND_HOST_WIN_VIBRATION: 'sendHostWinVibration',
  SEND_HOST_LOSE_VIBRATION: 'sendHostLoseVibration',
  SEND_HOST_PADDLE_VIBRATION: 'sendHostPaddleVibration',
  SEND_GUEST_PADDLE_VIBRATION: 'sendGuestPaddleVibration',
  LOAD_CONTROLLER_GAME_PAGE: 'loadControllerGamePage',
  REQUEST_EXIT_GAME: 'requestExitGame',
  RECEIVE_EXIT_GAME: 'receiveExitGame',
  ENTER_CONTROLLER_GAME_PAGE: 'enterControllerGamePage',
  SEND_MOVE_UP: 'sendMoveUp',
  SEND_MOVE_DOWN: 'sendMoveDown',
  SEND_MOVE_LEFT: 'sendMoveLeft',
  SEND_MOVE_RIGHT: 'sendMoveRight',
  RECEIVE_MOVE_UP: 'receiveMoveUp',
  RECEIVE_MOVE_DOWN: 'receiveMoveDown',
  RECEIVE_MOVE_LEFT: 'receiveMoveLeft',
  RECEIVE_MOVE_RIGHT: 'receiveMoveRight',
  SEND_MOTION_CHANGING_MODE_STATE: 'sendMotionChangingModeState',
  RECEIVE_MOTION_CHANGING_MODE_STATE: 'receiveMotionChangingModeState',
  SEND_STOP_DETECT_MOTION: 'sendStopDetectMotion',
  RECEIVE_STOP_DETECT_MOTION: 'receiveStopDetectMotion',
  RECEIVE_EXPIRE_CONTROLLER: 'receiveExpireController',
};

Object.freeze(SocketEvent);

export default SocketEvent;
