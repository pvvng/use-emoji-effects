export declare function createElementPool<T extends HTMLElement>(factory: () => T): {
    get: () => T;
    release: (el: T) => number;
};
