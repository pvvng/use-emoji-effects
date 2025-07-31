import { createElementPool } from '../utils';
interface EmojiMakerOptions {
    emojiPool: ReturnType<typeof createElementPool>;
    emojis: string[];
    emojiSize: number;
    makerCount: number;
    getTargetRect: () => DOMRect | null;
}
export declare function createMakerHandler({ emojiPool, emojis, emojiSize, makerCount, getTargetRect, }: EmojiMakerOptions): (e: MouseEvent) => void;
export {};
