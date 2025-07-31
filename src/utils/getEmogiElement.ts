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
  emojiEl.style.willChange = "transform, opacity";

  return emojiEl;
}

interface BaseEmojiStyleOptions {
  emoji: string;
  size: number;
}

interface MotionEmojiStyleOptions extends BaseEmojiStyleOptions {
  x: number;
  y: number;
  duration: number;
}

/** trail, explostion motion 가변 스타일 적용 */
export function applyMotionEmojiStyle(
  el: HTMLElement,
  { emoji, x, y, size, duration }: MotionEmojiStyleOptions
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

interface MarkerEmojiStyleOptions extends BaseEmojiStyleOptions {
  xPercent: number; // 퍼센트
  yPercent: number; // 퍼센트
}

/** marker 가변 스타일 적용 */
export function applyMarkerEmojiStyle(
  el: HTMLElement,
  { emoji, xPercent, yPercent, size }: MarkerEmojiStyleOptions
) {
  el.style.position = "absolute"; // absolute position
  el.textContent = emoji;
  el.style.left = `${xPercent}%`;
  el.style.top = `${yPercent}%`;
  el.style.transform = `translate(-50%, -50%)`; // 마커 중앙 정렬
  el.style.fontSize = `${size}px`;

  return el;
}
