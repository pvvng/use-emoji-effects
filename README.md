![Banner](https://raw.githubusercontent.com/pvvng/use-emoji-effects/main/assets/banner.png)

# 🥴 useEmojiEffects

Simple React hooks for delightful emoji animations that respond to user interactions.

## 📌 Installation

```bash
npm install use-emoji-effects
```

## 📌 Example

> All hooks return a ref<T>, and the generic T can be customized as needed.

### `useEmojiTrail`

The emoji follows along the mouse cursor with its tail drawn.

> 💡 This hook is generic:  
> `useEmojiTrail<T extends HTMLElement = HTMLDivElement>`  
> By default, it returns a ref to a `div`, but you can override it.

```tsx
import { useEmojiTrail } from "use-emoji-effects";

export default function App() {
  const ref = useEmojiTrail();

  return (
    <div ref={ref} style={{ width: "100%", height: "100vh" }}>
      Move your mouse!
    </div>
  );
}
```

### `useEmojiExplosion`

When clicked, the emoji shoots out like a firecracker from the location.

> 💡 This hook is generic:  
> `useEmojiExplosion<T extends HTMLElement = HTMLButtonElement>`  
> By default, it returns a ref to a `button`, but you can override it.

```tsx
import { useEmojiExplosion } from "use-emoji-effects";

export default function App() {
  const ref = useEmojiExplosion();

  return (
    <button
      ref={ref}
      style={{ width: 200, height: 100, background: "#fefefe" }}
    >
      Click to explode!
    </button>
  );
}
```

### `useEmojiMaker`

Leave an emoji marker at the point you click.

> 💡 This hook is generic:  
> `useEmojiMaker<T extends HTMLElement = HTMLDivElement>`  
> By default, it returns a ref to a `div`, but you can override it.

```tsx
import { useEmojiMaker } from "use-emoji-effects";

export default function App() {
  const ref = useEmojiMaker();

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100vh",
        border: "2px dashed gray",
        position: "relative",
      }}
    >
      Click to take a marker!
    </div>
  );
}
```

## 📌 API Options

> Each hook comes with a set of options to customize the emoji effects to your needs.

### `useEmojiTrail(options)`

| Option         | Type       | Description                                | Default              |
| -------------- | ---------- | ------------------------------------------ | -------------------- |
| `emojis`       | `string[]` | Array of emojis to trail behind the cursor | `["🐾", "🐱", "🍀"]` |
| `emojiSize`    | `number`   | Size of each emoji in pixels               | `16`                 |
| `transition`   | `number`   | Duration of the fade-out animation in ms   | `1200`               |
| `emitInterval` | `number`   | Minimum interval between emojis in ms      | `10`                 |

### `useEmojiExplosion(options)`

| Option       | Type       | Description                                 | Default                           |
| ------------ | ---------- | ------------------------------------------- | --------------------------------- |
| `emojis`     | `string[]` | Emojis that explode from the click position | `["💥", "✨", "❤️", "⭐️", "😘"]` |
| `emojiSize`  | `number`   | Size of exploding emojis                    | `16`                              |
| `emojiCount` | `number`   | Number of emojis per explosion              | `32`                              |
| `transition` | `number`   | Duration of explosion animation in ms       | `1200`                            |
| `spread`     | `number`   | How far emojis spread out in pixels         | `256`                             |

### `useEmojiMarker(options)`

| Option        | Type       | Description                                       | Default  |
| ------------- | ---------- | ------------------------------------------------- | -------- |
| `emojis`      | `string[]` | Emojis used to mark the clicked location          | `["📌"]` |
| `emojiSize`   | `number`   | Size of the marker emoji                          | `24`     |
| `markerCount` | `number`   | Maximum number of emoji markers displayed at once | `20`     |

## 📌 Contributing

Feel free to open issues or pull requests!
If you have ideas or edge cases you’d like supported, let’s discuss it on GitHub.
