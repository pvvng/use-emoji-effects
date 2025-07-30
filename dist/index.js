import { useRef as p, useMemo as d, useEffect as E } from "react";
function v(e) {
  const o = [];
  return { get: () => o.pop() ?? e(), release: (n) => o.push(n) };
}
function j() {
  const e = document.createElement("span");
  return e.style.opacity = "1", e.style.transition = "none", e.style.position = "fixed", e.style.left = "0px", e.style.top = "0px", e.style.pointerEvents = "none", e.style.zIndex = "99999", e.style.opacity = "1", e;
}
function x(e, { emoji: o, x: r, y: t, size: n, duration: s }) {
  return e.style.opacity = "1", e.style.transition = "none", e.textContent = o, e.style.transform = `translate(${r}px, ${t}px)`, e.style.fontSize = `${n}px`, e.style.transition = `transform ${s}ms ease-out, opacity ${s}ms ease-out`, e;
}
const h = (e) => e[Math.floor(Math.random() * e.length)];
function $(e) {
  getComputedStyle(e).position === "static" && (e.style.position = "relative");
}
function S({
  emojiPool: e,
  emojis: o,
  emojiSize: r,
  emojiCount: t,
  transition: n,
  spread: s
}) {
  return (y) => {
    const { clientX: a, clientY: l } = y;
    for (let m = 0; m < t; m++) {
      const i = h(o);
      let c = e.get();
      c = x(c, {
        emoji: i,
        x: a,
        y: l,
        size: r,
        duration: n
      }), document.body.appendChild(c);
      const u = (Math.random() - 0.5) * s, g = (Math.random() - 0.5) * s, M = 0.5 + Math.random();
      requestAnimationFrame(() => {
        c.style.transition = `opacity ${n}ms ease, transform ${n}ms ease`, c.style.opacity = "0", c.style.transform = `translate(${a + u}px, ${l + g}px) scale(${M})`;
      });
      const f = () => {
        c.removeEventListener("transitionend", f), e.release(c), c.remove();
      };
      c.addEventListener("transitionend", f);
    }
  };
}
function C({
  emojiPool: e,
  emojis: o,
  emojiSize: r,
  transition: t,
  emitInterval: n,
  lastEmitRef: s
}) {
  return function(a) {
    const l = Date.now();
    if (l - s.current < n) return;
    s.current = l;
    const { clientX: m, clientY: i } = a, c = h(o);
    let u = e.get();
    u = x(u, {
      emoji: c,
      x: m,
      y: i,
      size: r,
      duration: t
    }), document.body.appendChild(u), requestAnimationFrame(() => {
      u.style.transition = `opacity ${t}ms ease, transform ${t}ms ease`, u.style.opacity = "0";
    }), setTimeout(() => {
      e.release(u), u.remove();
    }, t);
  };
}
function L(e = {}) {
  const {
    emojis: o = ["💥", "✨", "❤️", "⭐️", "😘"],
    emojiSize: r = 16,
    emojiCount: t = 32,
    transition: n = 1200,
    spread: s = 256
  } = e, y = p(null), a = d(() => o, [JSON.stringify(o)]), l = d(() => v(j), []), m = d(
    () => S({
      emojiPool: l,
      emojis: a,
      emojiSize: r,
      emojiCount: t,
      transition: n,
      spread: s
    }),
    [l, a, r, t, n, s]
  );
  return E(() => {
    const i = y.current;
    if (i)
      return $(i), i.addEventListener("click", m), () => {
        i.removeEventListener("click", m);
      };
  }, [a, r, n, t, s]), y;
}
function b(e = {}) {
  const {
    emojis: o = ["🐾", "🐱", "🍀"],
    emojiSize: r = 16,
    transition: t = 1200,
    emitInterval: n = 40
  } = e, s = p(null), y = p(0), a = d(() => o, [JSON.stringify(o)]), l = d(() => v(j), []), m = d(
    () => C({
      emojiPool: l,
      emojis: a,
      emojiSize: r,
      transition: t,
      emitInterval: n,
      lastEmitRef: y
    }),
    [l, a, r, t, n]
  );
  return E(() => {
    const i = s.current;
    if (i)
      return $(i), i.addEventListener("mousemove", m), () => {
        i.removeEventListener("mousemove", m);
      };
  }, [a, r, t, n]), s;
}
export {
  L as useEmojiExplosion,
  b as useEmojiTrail
};
