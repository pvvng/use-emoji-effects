import { useEffect, useMemo, useRef } from "react";
import {
  createEmojiElement,
  createElementPool,
  setRelativeIfStatic,
} from "../utils";
import { createTrailHandler } from "../handler";

interface EmojiTrailOptions {
  emojis?: string[];
  emojiSize?: number;
  transition?: number;
  emitInterval?: number;
}

export function useEmojiTrail<T extends HTMLElement = HTMLDivElement>(
  options: EmojiTrailOptions = {}
) {
  const {
    emojis = ["🐾", "🐱", "🍀"],
    emojiSize = 16,
    transition = 1200,
    emitInterval = 40,
  } = options;

  const ref = useRef<T>(null);
  const lastEmitRef = useRef(0); // 마지막 이모지 생성 시각

  const stableEmojis = useMemo(() => emojis, [JSON.stringify(emojis)]); // effect 의존성 배열용 stable한 emojis
  const emojiPool = useMemo(() => createElementPool(createEmojiElement), []); // 전역 emoji pool 생성
  const handleMouseMove = useMemo(
    () =>
      createTrailHandler({
        emojiPool,
        emojis: stableEmojis,
        emojiSize,
        transition,
        emitInterval,
        lastEmitRef,
      }),
    [emojiPool, stableEmojis, emojiSize, transition, emitInterval]
  ); // 트레일 이벤트 핸들러

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    setRelativeIfStatic(target);

    target.addEventListener("mousemove", handleMouseMove);
    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
    };
  }, [stableEmojis, emojiSize, transition, emitInterval]);

  return ref;
}
