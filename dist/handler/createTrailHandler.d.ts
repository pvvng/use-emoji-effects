import { createElementPool } from '../utils';
interface TrailHandlerOptions {
    emojiPool: ReturnType<typeof createElementPool>;
    emojis: string[];
    emojiSize: number;
    transition: number;
    emitInterval: number;
    lastEmitRef: React.RefObject<number>;
}
export declare function createTrailHandler({ emojiPool, emojis, emojiSize, transition, emitInterval, lastEmitRef, }: TrailHandlerOptions): (e: MouseEvent) => void;
export {};
