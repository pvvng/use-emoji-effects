import {
  applyMakerEmojiStyle,
  createElementPool,
  getRandomEmoji,
} from "../utils";

interface EmojiMakerOptions {
  emojiPool: ReturnType<typeof createElementPool>;
  emojis: string[];
  emojiSize: number;
  makerCount: number;
  getTargetRect: () => DOMRect | null;
}

export function createMakerHandler({
  emojiPool,
  emojis,
  emojiSize,
  makerCount,
  getTargetRect,
}: EmojiMakerOptions) {
  return (e: MouseEvent) => {
    const rect = getTargetRect();
    if (!rect) return;

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const emoji = getRandomEmoji(emojis);

    let emojiEl = emojiPool.get(makerCount - 1, "FIFO");

    emojiEl = applyMakerEmojiStyle(emojiEl, {
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
