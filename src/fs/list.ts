import { promises as fs } from 'fs';
import path from 'path';
import * as C from '../constants.ts';

export const list = async (folderName: string) => {
    const folderPath = path.resolve(folderName);
    try {
        await fs.access(folderPath);
        const files = await fs.readdir(folderPath);
        console.log(files);
    } catch {
        throw new Error(C.ERROR_MESSAGE_FS);
    }
};

// list(C.FILES);
