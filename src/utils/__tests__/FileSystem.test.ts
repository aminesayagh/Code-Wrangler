import { FileSystem } from '../FileSystem';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { MOCK_PATH } from '../../__mocks__/mockFileSystem';

jest.mock('fs', () => ({
    promises: {
        readdir: jest.fn(),
    },
}));

describe('FileSystem', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return files matching the pattern', async () => {
    const mockDirents = [
      { name: 'file1.ts', isDirectory: () => false },
      { name: 'file2.js', isDirectory: () => false },
      { name: 'dir', isDirectory: () => true },
    ];
    (fsPromises.readdir as jest.Mock).mockResolvedValueOnce(mockDirents);
    (fsPromises.readdir as jest.Mock).mockResolvedValueOnce([
      { name: 'file3.ts', isDirectory: () => false },
    ]);

    const files = await FileSystem.getFiles(MOCK_PATH, '\\.ts$');

    expect(files).toEqual([
      path.resolve(MOCK_PATH, 'file1.ts'),
      path.resolve(MOCK_PATH, 'dir', 'file3.ts'),
    ]);
  });
});