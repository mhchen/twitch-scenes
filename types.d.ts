import { MonkeyPatchedComfyJSInterface } from './src/types';

export declare global {
  interface Window {
    ComfyJS: MonkeyPatchedComfyJSInterface;
  }
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
