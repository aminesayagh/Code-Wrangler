import { FileSystem } from '../FileSystem';
import path from 'path';
import { MOCK_PATH } from '../../__mocks__/mockFileSystem';

jest.unmock('fs');
jest.unmock('fs/promises');

describe('FileSystem', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return files matching the pattern', async () => {
    const files = await FileSystem.getFiles(MOCK_PATH, '\\.ts$');

    expect(files).toEqual([
      path.resolve(MOCK_PATH, 'file1.ts'),
      path.resolve(MOCK_PATH, 'dir', 'file3.ts'),
    ].sort());
  });
});