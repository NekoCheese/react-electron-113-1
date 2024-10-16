import { atom } from 'recoil'

export interface TodoItem {
  id: number
  text: string
  isComplete: boolean
}

export const todoListState = atom<TodoItem[]>({
  key: 'todoListState', // 唯一的 key，用來標識這個 atom
  default: [] // 默認值，初始是空的待辦事項陣列
})
