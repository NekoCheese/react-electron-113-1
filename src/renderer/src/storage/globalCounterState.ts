import { atom } from 'recoil'

export const globalCounterState = atom<number>({
  key: 'globalCounterState',
  default: 0
})
