import { createElementPool } from '../utils';
interface EmojiMarkerOptions {
    emojiPool: ReturnType<typeof createElementPool>;
    emojis: string[];
    emojiSize: number;
    markerCount: number;
    getTargetRect: () => DOMRect | null;
}
export declare function createMarkerHandler({ emojiPool, emojis, emojiSize, markerCount, getTargetRect, }: EmojiMarkerOptions): (e: MouseEvent) => void;
export {};
