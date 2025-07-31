import { useRef, useEffect, useMemo } from "react";
import {
  createEmojiElement,
  createElementPool,
  setRelativeIfStatic,
} from "../utils";
import { createExplosionHandler } from "../handler";

interface EmojiExplosionOptions {
  emojis?: string[];
  emojiSize?: number;
  emojiCount?: number;
  transition?: number;
  spread?: number;
}

export function useEmojiExplosion<T extends HTMLElement = HTMLButtonElement>(
  options: EmojiExplosionOptions = {}
) {
  const {
    emojis = ["💥", "✨", "❤️", "⭐️", "😘"],
    emojiSize = 16,
    emojiCount = 32,
    transition = 1200,
    spread = 256,
  } = options;

  const ref = useRef<T>(null);

  const stableEmojis = useMemo(() => emojis, [JSON.stringify(emojis)]); // effect 의존성 배열용 stable한 emojis
  const emojiPool = useMemo(() => createElementPool(createEmojiElement), []); // 전역 emoji pool 생성
  const handleClick = useMemo(
    () =>
      createExplosionHandler({
        emojiPool,
        emojis: stableEmojis,
        emojiSize,
        emojiCount,
        transition,
        spread,
      }),
    [emojiPool, stableEmojis, emojiSize, emojiCount, transition, spread]
  ); // 클릭 이벤트 핸들러

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    setRelativeIfStatic(target);

    target.addEventListener("click", handleClick);
    return () => {
      target.removeEventListener("click", handleClick);
    };
  }, [stableEmojis, emojiSize, transition, emojiCount, spread]);

  return ref;
}
