import { atom } from 'recoil';

const settingState = atom({
  key: 'setting',
  default: {
    isVibrationMode: false,
    isPlayingMusic: false,
    isPlayingSFX: false,
    isChangedPageByMotion: false,
  },
});

export default settingState;
