import {
  type createElementPool,
  applyMotionEmojiStyle,
  getRandomEmoji,
} from "../utils";

interface ClickExplosionOptions {
  emojiPool: ReturnType<typeof createElementPool>;
  emojis: string[];
  emojiSize: number;
  emojiCount: number;
  transition: number;
  spread: number;
}

export function createExplosionHandler({
  emojiPool,
  emojis,
  emojiSize,
  emojiCount,
  transition,
  spread,
}: ClickExplosionOptions) {
  return (e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;

    for (let i = 0; i < emojiCount; i++) {
      const emoji = getRandomEmoji(emojis);

      let emojiEl = emojiPool.get();
      emojiEl = applyMotionEmojiStyle(emojiEl, {
        emoji,
        x,
        y,
        size: emojiSize,
        duration: transition,
      });

      document.body.appendChild(emojiEl);

      // 애니메이션 난수
      const dx = (Math.random() - 0.5) * spread;
      const dy = (Math.random() - 0.5) * spread;
      const scale = 0.5 + Math.random();

      requestAnimationFrame(() => {
        emojiEl.style.transition = `opacity ${transition}ms ease, transform ${transition}ms ease`;
        emojiEl.style.opacity = "0";
        emojiEl.style.transform = `translate(${x + dx}px, ${
          y + dy
        }px) scale(${scale})`;
      });

      const handleEnd = () => {
        emojiEl.removeEventListener("transitionend", handleEnd);
        emojiPool.release(emojiEl);
        emojiEl.remove();
      };

      emojiEl.addEventListener("transitionend", handleEnd);
    }
  };
}
