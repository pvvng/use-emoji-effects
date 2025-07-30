import {
  type createElementPool,
  applyEmojiStyle,
  getRandomEmoji,
} from "../utils";

interface TrailHandlerOptions {
  emojiPool: ReturnType<typeof createElementPool>;
  emojis: string[];
  emojiSize: number;
  transition: number;
  emitInterval: number;
  lastEmitRef: React.RefObject<number>;
}

export function createTrailHandler({
  emojiPool,
  emojis,
  emojiSize,
  transition,
  emitInterval,
  lastEmitRef,
}: TrailHandlerOptions) {
  return function handleMouseMove(e: MouseEvent) {
    const now = Date.now();
    if (now - lastEmitRef.current < emitInterval) return;
    lastEmitRef.current = now;

    const { clientX: x, clientY: y } = e;
    const emoji = getRandomEmoji(emojis);

    let emojiEl = emojiPool.get();
    emojiEl = applyEmojiStyle(emojiEl, {
      emoji,
      x,
      y,
      size: emojiSize,
      duration: transition,
    });

    document.body.appendChild(emojiEl);

    requestAnimationFrame(() => {
      emojiEl.style.transition = `opacity ${transition}ms ease, transform ${transition}ms ease`;
      emojiEl.style.opacity = "0";
    });

    setTimeout(() => {
      emojiPool.release(emojiEl);
      emojiEl.remove();
    }, transition);
  };
}
