declare class hasher {
    static md5(value: string): string;
    static sha256(value: string): string;
    static sm3(value: string): string;
}
export = hasher;
