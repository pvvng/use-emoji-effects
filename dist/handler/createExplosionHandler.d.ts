import { createElementPool } from '../utils';
interface ClickExplosionOptions {
    emojiPool: ReturnType<typeof createElementPool>;
    emojis: string[];
    emojiSize: number;
    emojiCount: number;
    transition: number;
    spread: number;
}
export declare function createExplosionHandler({ emojiPool, emojis, emojiSize, emojiCount, transition, spread, }: ClickExplosionOptions): (e: MouseEvent) => void;
export {};
