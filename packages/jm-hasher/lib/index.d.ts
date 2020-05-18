declare class hasher {
    static md5(value: string): string;
    static sha256(value: string): string;
    static sm3(value: string): string;
}
declare const _default: {
    hasher: typeof hasher;
};
export = _default;
