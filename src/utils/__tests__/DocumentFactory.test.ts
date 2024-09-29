import { DocumentFactory } from '../DocumentFactory';
import { File } from '../../models/File';
import { Directory } from '../../models/Directory';
import * as fsPromises from 'fs/promises';
import { MOCK_PATH } from '../../__mocks__/mockFileSystem';

jest.mock('fs/promises', () => ({
  stat: jest.fn(),
}));

describe('DocumentFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a File for a file path', async () => {
    const filePath = `${MOCK_PATH}/file1.ts`;
    (fsPromises.stat as jest.Mock).mockResolvedValue({ isDirectory: () => false });

    const document = await DocumentFactory.create(filePath);

    expect(document).toBeInstanceOf(File);
    expect(document.name).toBe('file1.ts');
    expect(document.path).toBe(filePath);
    expect(fsPromises.stat).toHaveBeenCalledWith(filePath);
  });

  it('should create a Directory for a directory path', async () => {
    const dirPath = `${MOCK_PATH}/dir`;
    (fsPromises.stat as jest.Mock).mockResolvedValue({ isDirectory: () => true });

    const document = await DocumentFactory.create(dirPath);

    expect(document).toBeInstanceOf(Directory);
    expect(document.name).toBe('dir');
    expect(document.path).toBe(dirPath);
    expect(fsPromises.stat).toHaveBeenCalledWith(dirPath);
  });
});