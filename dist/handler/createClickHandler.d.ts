import { createElementPool } from '../utils';
interface ClickHandlerOptions {
    emojiPool: ReturnType<typeof createElementPool>;
    emojis: string[];
    emojiSize: number;
    emojiCount: number;
    transition: number;
    spread: number;
}
export declare function createClickHandler({ emojiPool, emojis, emojiSize, emojiCount, transition, spread, }: ClickHandlerOptions): (e: MouseEvent) => void;
export {};
