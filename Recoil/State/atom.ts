import { UserStats } from '@/types';
import { atom } from 'recoil';

export const usernameState = atom({
  key: 'usernameState',
  default: '',
});

export const loadingState = atom({
  key: 'loadingState',
  default: true,
});

export const userStatsState = atom<UserStats | null>({
  key: 'userStatsState',
  default: null,
});

export const graphState = atom<any>({
  key: 'graphState',
  default: null,
});

export const backgroundState = atom<string>({
  key: 'backgroundState',
  default: "assets/black.png"
})