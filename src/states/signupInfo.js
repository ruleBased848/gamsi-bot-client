import { atom } from 'recoil';

export const signupInfoState = atom({
  key: 'signupInfoState',
  default: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
});