export declare function createEmojiElement(): HTMLElement;
interface EmojiStyleOptions {
    emoji: string;
    x: number;
    y: number;
    size: number;
    duration: number;
}
export declare function applyEmojiStyle(el: HTMLElement, { emoji, x, y, size, duration }: EmojiStyleOptions): HTMLElement;
export {};
