interface EmojiExplosionOptions {
    emojis?: string[];
    emojiSize?: number;
    emojiCount?: number;
    transition?: number;
    spread?: number;
}
export declare function useEmojiExplosion<T extends HTMLElement = HTMLButtonElement>(options?: EmojiExplosionOptions): import('react').RefObject<T | null>;
export {};
