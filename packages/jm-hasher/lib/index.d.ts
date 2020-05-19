declare class Hasher {
    static md5(value: string): string;
    static sha256(value: string): string;
    static sm3(value: string): string;
}
export = Hasher;
