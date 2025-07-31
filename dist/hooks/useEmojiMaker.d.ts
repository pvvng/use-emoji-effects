interface EmojiMakerOptions {
    emojis?: string[];
    emojiSize?: number;
    makerCount?: number;
}
export declare function useEmojiMaker<T extends HTMLElement = HTMLDivElement>(options?: EmojiMakerOptions): import('react').RefObject<T | null>;
export {};
