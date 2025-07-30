interface EmojiTrailOptions {
    emojis?: string[];
    emojiSize?: number;
    transition?: number;
    emitInterval?: number;
}
export declare function useEmojiTrail<T extends HTMLElement = HTMLDivElement>(options?: EmojiTrailOptions): import('react').RefObject<T | null>;
export {};
