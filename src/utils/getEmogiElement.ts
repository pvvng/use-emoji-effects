/** 기본 이모지 span 생성 */
export function createEmojiElement(): HTMLElement {
  const emojiEl = document.createElement("span");

  // init
  emojiEl.style.opacity = "1";
  emojiEl.style.transition = "none";

  // default style
  emojiEl.style.position = "fixed";
  emojiEl.style.left = "0px";
  emojiEl.style.top = "0px";
  emojiEl.style.pointerEvents = "none";
  emojiEl.style.zIndex = "99999";
  emojiEl.style.opacity = "1";

  return emojiEl;
}

interface EmojiStyleOptions {
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
}

/** 가변 스타일 적용 */
export function applyEmojiStyle(
  el: HTMLElement,
  { emoji, x, y, size, duration }: EmojiStyleOptions
): HTMLElement {
  // 재사용된 element 대비 init
  el.style.opacity = "1";
  el.style.transition = "none";

  el.textContent = emoji;
  el.style.transform = `translate(${x}px, ${y}px)`;
  el.style.fontSize = `${size}px`;
  el.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

  return el;
}
