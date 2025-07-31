type PoolMode = "LIFO" | "FIFO";

/** 여러 개의 element를 재사용하기 위한 풀 */
export function createElementPool<T extends HTMLElement>(factory: () => T) {
  const pool: T[] = [];

  const get = (minSize = 0, mode: PoolMode = "LIFO") => {
    // 최소 유지 크기 이상일 때만 shift
    if (pool.length > minSize) {
      return mode === "FIFO" ? pool.shift()! : pool.pop()!;
    }
    return factory();
  };
  const release = (el: T) => pool.push(el);
  const size = () => pool.length;

  return { get, release, size };
}

/** 하나의 element만 재사용하는 싱글턴 풀 */
export function createSingletonPool<T extends HTMLElement>(factory: () => T) {
  let instance: T | null = null;

  const get = () => {
    if (!instance) {
      instance = factory();
    }
    return instance;
  };

  return { get };
}
