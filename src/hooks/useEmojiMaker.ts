import { useEffect, useMemo, useRef } from "react";
import {
  createEmojiElement,
  setRelativeIfStatic,
  createElementPool,
} from "../utils";
import { createMakerHandler } from "../handler";

interface EmojiMakerOptions {
  emojis?: string[];
  emojiSize?: number;
  makerCount?: number;
}

export function useEmojiMaker<T extends HTMLElement = HTMLDivElement>(
  options: EmojiMakerOptions = {}
) {
  const { emojis = ["📌"], emojiSize = 24, makerCount = 20 } = options;

  const ref = useRef<T>(null);
  const stableEmojis = useMemo(() => emojis, [JSON.stringify(emojis)]); // effect 의존성 배열용 stable한 emojis
  const emojiPool = useMemo(() => createElementPool(createEmojiElement), []); // 전역 emoji pool 생성
  const handler = useMemo(
    () =>
      createMakerHandler({
        emojiPool,
        emojis,
        emojiSize,
        makerCount,
        getTargetRect: () => ref.current?.getBoundingClientRect() ?? null,
      }),
    [emojiPool, emojis, emojiSize]
  );

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    setRelativeIfStatic(target);

    target.addEventListener("click", handler);
    return () => target.removeEventListener("click", handler);
  }, [stableEmojis, emojiSize]);

  return ref;
}
