import { promises as fs } from 'fs';
import path from 'path';

export const rename = async (oldName: string, newName: string, folder: string) => {
    const oldPath = path.resolve(`${folder}/${oldName}`);
    const newPath = path.resolve(`${folder}/${newName}`);

    try {
        await fs.access(oldPath);
        try {
            await fs.access(newPath);
            throw new Error(`exist`);
        } catch (err) {
            const { message } = err as NodeJS.ErrnoException;
            if (message === `exist`) {
                throw new Error(`exist`);
            } else {
                await fs.rename(oldPath, newPath);
            }
        }
    } catch (err) {
        const { code, message } = err as NodeJS.ErrnoException;
        if (code === 'ENOENT') {
            throw new Error(`Couldn't find file: ${oldName}`);
        }
        if (message === 'exist') {
            throw new Error(`The file with new name: ${newName} -- exist`);
        }
    }
}

// rename('wrongFilename.txt', 'fileNewName.txt');