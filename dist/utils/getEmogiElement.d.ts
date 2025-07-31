export declare function createEmojiElement(): HTMLElement;
interface BaseEmojiStyleOptions {
    emoji: string;
    size: number;
}
interface MotionEmojiStyleOptions extends BaseEmojiStyleOptions {
    x: number;
    y: number;
    duration: number;
}
export declare function applyMotionEmojiStyle(el: HTMLElement, { emoji, x, y, size, duration }: MotionEmojiStyleOptions): HTMLElement;
interface MarkerEmojiStyleOptions extends BaseEmojiStyleOptions {
    xPercent: number;
    yPercent: number;
}
export declare function applyMarkerEmojiStyle(el: HTMLElement, { emoji, xPercent, yPercent, size }: MarkerEmojiStyleOptions): HTMLElement;
export {};
