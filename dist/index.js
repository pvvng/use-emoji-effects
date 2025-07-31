import { useRef as f, useMemo as y, useEffect as p } from "react";
function d(t) {
  const e = [];
  return { get: (n = 0, i = "LIFO") => e.length > n ? i === "FIFO" ? e.shift() : e.pop() : t(), release: (n) => e.push(n), size: () => e.length };
}
function E() {
  const t = document.createElement("span");
  return t.style.opacity = "1", t.style.transition = "none", t.style.position = "fixed", t.style.left = "0px", t.style.top = "0px", t.style.pointerEvents = "none", t.style.zIndex = "99999", t.style.opacity = "1", t.style.willChange = "transform, opacity", t;
}
function v(t, { emoji: e, x: r, y: s, size: o, duration: n }) {
  return t.style.opacity = "1", t.style.transition = "none", t.textContent = e, t.style.transform = `translate(${r}px, ${s}px)`, t.style.fontSize = `${o}px`, t.style.transition = `transform ${n}ms ease-out, opacity ${n}ms ease-out`, t;
}
function S(t, { emoji: e, xPercent: r, yPercent: s, size: o }) {
  return t.style.position = "absolute", t.textContent = e, t.style.left = `${r}%`, t.style.top = `${s}%`, t.style.transform = "translate(-50%, -50%)", t.style.fontSize = `${o}px`, t;
}
const g = (t) => t[Math.floor(Math.random() * t.length)];
function j(t) {
  getComputedStyle(t).position === "static" && (t.style.position = "relative");
}
function z({
  emojiPool: t,
  emojis: e,
  emojiSize: r,
  emojiCount: s,
  transition: o,
  spread: n
}) {
  return (i) => {
    const { clientX: c, clientY: m } = i;
    for (let u = 0; u < s; u++) {
      const l = g(e);
      let a = t.get();
      a = v(a, {
        emoji: l,
        x: c,
        y: m,
        size: r,
        duration: o
      }), document.body.appendChild(a);
      const x = (Math.random() - 0.5) * n, $ = (Math.random() - 0.5) * n, M = 0.5 + Math.random();
      requestAnimationFrame(() => {
        a.style.transition = `opacity ${o}ms ease, transform ${o}ms ease`, a.style.opacity = "0", a.style.transform = `translate(${c + x}px, ${m + $}px) scale(${M})`;
      });
      const h = () => {
        a.removeEventListener("transitionend", h), t.release(a), a.remove();
      };
      a.addEventListener("transitionend", h);
    }
  };
}
function C({
  emojiPool: t,
  emojis: e,
  emojiSize: r,
  transition: s,
  emitInterval: o,
  lastEmitRef: n
}) {
  return (i) => {
    const c = Date.now();
    if (c - n.current < o) return;
    n.current = c;
    const { clientX: m, clientY: u } = i, l = g(e);
    let a = t.get();
    a = v(a, {
      emoji: l,
      x: m,
      y: u,
      size: r,
      duration: s
    }), document.body.appendChild(a), requestAnimationFrame(() => {
      a.style.transition = `opacity ${s}ms ease, transform ${s}ms ease`, a.style.opacity = "0";
    }), setTimeout(() => {
      t.release(a), a.remove();
    }, s);
  };
}
function k({
  emojiPool: t,
  emojis: e,
  emojiSize: r,
  makerCount: s,
  getTargetRect: o
}) {
  return (n) => {
    const i = o();
    if (!i) return;
    const c = (n.clientX - i.left) / i.width * 100, m = (n.clientY - i.top) / i.height * 100, u = g(e);
    let l = t.get(s - 1, "FIFO");
    l = S(l, {
      emoji: u,
      xPercent: c,
      yPercent: m,
      size: r
    }), n.currentTarget.appendChild(l), t.release(l);
  };
}
function F(t = {}) {
  const {
    emojis: e = ["💥", "✨", "❤️", "⭐️", "😘"],
    emojiSize: r = 16,
    emojiCount: s = 32,
    transition: o = 1200,
    spread: n = 256
  } = t, i = f(null), c = y(() => e, [JSON.stringify(e)]), m = y(() => d(E), []), u = y(
    () => z({
      emojiPool: m,
      emojis: c,
      emojiSize: r,
      emojiCount: s,
      transition: o,
      spread: n
    }),
    [m, c, r, s, o, n]
  );
  return p(() => {
    const l = i.current;
    if (l)
      return j(l), l.addEventListener("click", u), () => {
        l.removeEventListener("click", u);
      };
  }, [c, r, o, s, n]), i;
}
function b(t = {}) {
  const {
    emojis: e = ["🐾", "🐱", "🍀"],
    emojiSize: r = 16,
    transition: s = 1200,
    emitInterval: o = 10
  } = t, n = f(null), i = f(0), c = y(() => e, [JSON.stringify(e)]), m = y(() => d(E), []), u = y(
    () => C({
      emojiPool: m,
      emojis: c,
      emojiSize: r,
      transition: s,
      emitInterval: o,
      lastEmitRef: i
    }),
    [m, c, r, s, o]
  );
  return p(() => {
    const l = n.current;
    if (l)
      return j(l), l.addEventListener("mousemove", u), () => {
        l.removeEventListener("mousemove", u);
      };
  }, [c, r, s, o]), n;
}
function I(t = {}) {
  const { emojis: e = ["📌"], emojiSize: r = 24, makerCount: s = 20 } = t, o = f(null), n = y(() => e, [JSON.stringify(e)]), i = y(() => d(E), []), c = y(
    () => k({
      emojiPool: i,
      emojis: e,
      emojiSize: r,
      makerCount: s,
      getTargetRect: () => o.current?.getBoundingClientRect() ?? null
    }),
    [i, e, r]
  );
  return p(() => {
    const m = o.current;
    if (m)
      return j(m), m.addEventListener("click", c), () => m.removeEventListener("click", c);
  }, [n, r]), o;
}
export {
  F as useEmojiExplosion,
  I as useEmojiMaker,
  b as useEmojiTrail
};
