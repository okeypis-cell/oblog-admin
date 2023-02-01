import { WHITE_LIST } from '@/constants'

const whiteList = WHITE_LIST

export function isTags(path: string) {
  return !whiteList.includes(path)
}
