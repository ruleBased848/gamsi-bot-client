import { atom } from 'recoil';

export const requestState = atom({
  key: 'requestState',
  default: {
    handle: '',
    targetSubscriberCount: 0,
    emailAddress: '',
  },
});