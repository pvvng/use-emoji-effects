import { useEffect, useMemo, useRef } from "react";
import {
  createEmojiElement,
  setRelativeIfStatic,
  createElementPool,
} from "../utils";
import { createMarkerHandler } from "../handler";

interface EmojiMarkerOptions {
  emojis?: string[];
  emojiSize?: number;
  markerCount?: number;
}

export function useEmojiMarker<T extends HTMLElement = HTMLDivElement>(
  options: EmojiMarkerOptions = {}
) {
  const { emojis = ["📌"], emojiSize = 24, markerCount = 20 } = options;

  const ref = useRef<T>(null);
  const stableEmojis = useMemo(() => emojis, [JSON.stringify(emojis)]); // effect 의존성 배열용 stable한 emojis
  const emojiPool = useMemo(() => createElementPool(createEmojiElement), []); // 전역 emoji pool 생성
  const handler = useMemo(
    () =>
      createMarkerHandler({
        emojiPool,
        emojis,
        emojiSize,
        markerCount,
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
