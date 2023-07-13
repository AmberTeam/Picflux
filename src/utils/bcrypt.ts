import * as bcrypt from 'bcrypt';

export async function encode(string: string) {
    const SALT = bcrypt.genSaltSync();
    return await bcrypt.hash(string, SALT);
}


export async function compare(string: string, hash: string) {
    return await bcrypt.compare(string, hash);
}