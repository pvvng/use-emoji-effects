interface EmojiMarkerOptions {
    emojis?: string[];
    emojiSize?: number;
    markerCount?: number;
}
export declare function useEmojiMarker<T extends HTMLElement = HTMLDivElement>(options?: EmojiMarkerOptions): import('react').RefObject<T | null>;
export {};
