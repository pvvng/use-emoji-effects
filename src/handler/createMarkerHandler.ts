import {
  applyMarkerEmojiStyle,
  createElementPool,
  getRandomEmoji,
} from "../utils";

interface EmojiMarkerOptions {
  emojiPool: ReturnType<typeof createElementPool>;
  emojis: string[];
  emojiSize: number;
  markerCount: number;
  getTargetRect: () => DOMRect | null;
}

export function createMarkerHandler({
  emojiPool,
  emojis,
  emojiSize,
  markerCount,
  getTargetRect,
}: EmojiMarkerOptions) {
  return (e: MouseEvent) => {
    const rect = getTargetRect();
    if (!rect) return;

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const emoji = getRandomEmoji(emojis);

    let emojiEl = emojiPool.get(markerCount - 1, "FIFO");

    emojiEl = applyMarkerEmojiStyle(emojiEl, {
      emoji,
      xPercent,
      yPercent,
      size: emojiSize,
    });

    // 타켓(ref 달린 element)에 appendChild
    const target = e.currentTarget as HTMLElement;
    target.appendChild(emojiEl);

    emojiPool.release(emojiEl);
  };
}
