import { promises as fs } from 'fs';
import path from 'path';
import { copy } from './copy';
import * as C from '../constants';

describe('Copy file', () => {
    const folderName = C.TEST;
    const folderCopeName = `${folderName}_copy`;
    const testFolderPath = 'src/fs/';
    const testSrcDir = `${testFolderPath}${folderName}`;
    const testdistDir = `${testFolderPath}${folderCopeName}`

    beforeEach(async () => {
        // create test folder
        await fs.mkdir(testSrcDir, { recursive: true });
        await fs.writeFile(path.join(testSrcDir, 'test.txt'), C.TEST);

        try {
            await fs.rm(testdistDir, { recursive: true, force: true });
        } catch { }
    });

    afterEach(async () => {
        // remove test folders
        try {
            await fs.rm(testSrcDir, { recursive: true, force: true });
            await fs.rm(testdistDir, { recursive: true, force: true });
        } catch { }
    });

    test('Copy folder test in test_copy', async () => {
        await copy(testSrcDir, testdistDir);
        const copied = await fs.readFile(path.join(testdistDir, 'test.txt'), 'utf-8');
        expect(copied).toBe(C.TEST);
    });

    test('Throw error if distDir exist', async () => {
        await fs.mkdir(testdistDir);
        await expect(copy(testSrcDir, testdistDir)).rejects.toThrow(C.ERROR_MESSAGE_FS);
    });
});
