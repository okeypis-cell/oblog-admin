/**
 * @description 全局类型定义
 * @author Caspian Sun
 * @date 2022-12-28
 */
import type { Ref } from 'vue';
import type { MessageApiInjection } from './MessageProvider';
import { useMessage } from 'naive-ui'

declare global {
  declare type Nullable<T> = T | null;
  declare type IRef<T> = Ref<T>;
  declare interface Window {
    $message: ReturnType<typeof useMessage>;
  }
}
