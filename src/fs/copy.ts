import { promises as fs } from 'fs';
import path from 'path';

import { ERROR_MESSAGE_FS } from '../constants';

export const copy = async (srcPath: string, distPath: string) => {
    try {
        // check is src folder exist
        await fs.access(srcPath);
        // check is dist folder exist
        try {
            await fs.access(distPath);
            throw new Error(ERROR_MESSAGE_FS);
        } catch (err: unknown) {
            const { code } = err as NodeJS.ErrnoException;
            if (code === 'ENOENT') {
                await fs.mkdir(distPath);
            } else {
                throw new Error(ERROR_MESSAGE_FS);
            }
        }


        const copyRecursive = async (src: string, dist: string) => {
            const entries = await fs.readdir(src, { withFileTypes: true });

            for (const entry of entries) {
                const srcP = path.join(src, entry.name);
                const distP = path.join(dist, entry.name);

                if (entry.isDirectory()) {
                    await copyRecursive(srcP, distP);
                } else {
                    await fs.copyFile(srcP, distP);
                }
            }
        };

        await copyRecursive(srcPath, distPath);

    } catch (err) {
        throw err;
    }
};

// test work only without this call
//copy('files', 'files_copy');