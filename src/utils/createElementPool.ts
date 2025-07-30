/** 새 element의 과생성을 막기위해 이미 생성된 element 재사용 함수 */
export function createElementPool<T extends HTMLElement>(factory: () => T) {
  const pool: T[] = [];

  const get = () => {
    return pool.pop() ?? factory();
  };

  const release = (el: T) => pool.push(el);

  return { get, release };
}
