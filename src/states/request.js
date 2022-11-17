import { atom } from 'recoil';

export const requestState = atom({
  key: 'requestState',
  default: {
    channelId: '',
    targetSubscriberCount: 0,
    emailAddress: '',
  },
});