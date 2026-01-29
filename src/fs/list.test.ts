import { promises as fs } from 'fs';
import path from 'path';
import { list } from './list';
import * as C from '../constants';

describe('list files', () => {
    const folderName = `${C.TEST_FOLDER_NAME}_list`;
    const folder = path.resolve(folderName);
    const file1 = 'file1.txt';
    const file2 = 'file2.txt';
    const filePath1 = path.join(folder, file1);
    const filePath2 = path.join(folder, file2);

    beforeAll(async () => {
        await fs.mkdir(folder, { recursive: true });
    });

    beforeEach(async () => {
        await fs.rm(filePath1, { force: true });
        await fs.rm(filePath2, { force: true });
    });

    afterAll(async () => {
        await fs.rm(folder, { recursive: true, force: true });
    });

    test('prints array of filenames when folder exists', async () => {
        await fs.writeFile(filePath1, 'content1');
        await fs.writeFile(filePath2, 'content2');
        const spy = jest.spyOn(console, 'log').mockImplementation(() => { });
        await list(folderName);
        expect(spy).toHaveBeenCalledWith(expect.arrayContaining([file1, file2]));
        spy.mockRestore();
    });

    test('throws error if folder does not exist', async () => {
        await fs.rm(folder, { recursive: true, force: true });
        await expect(list(folderName)).rejects.toThrow(C.ERROR_MESSAGE_FS);
        await fs.mkdir(folder, { recursive: true });
    });
});
