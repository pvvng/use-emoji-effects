type PoolMode = "LIFO" | "FIFO";
export declare function createElementPool<T extends HTMLElement>(factory: () => T): {
    get: (minSize?: number, mode?: PoolMode) => T;
    release: (el: T) => number;
    size: () => number;
};
export declare function createSingletonPool<T extends HTMLElement>(factory: () => T): {
    get: () => T;
};
export {};
