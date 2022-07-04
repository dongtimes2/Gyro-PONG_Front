import { atom } from 'recoil';

const settingState = atom({
  key: 'setting',
  default: {
    isVibrationMode: false,
    isPlayingMusic: false,
    isPlayingSFX: false,
    isChangedPageByMotion: false,
    isCheckingCompatibility: false,
    isCompatible: false,
  },
});

export default settingState;
