import { File } from "../File";
import { promises as fsPromises } from 'fs';
import { getContent, MOCK_PATH } from '../../__mocks__/mockFileSystem';

describe("File", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should read file content when getContent is called', async () => {
    const filePath = `${MOCK_PATH}/file1.ts`;
    const file = new File('file1.ts', filePath);
    const mockContent = getContent('/root/file1.ts');
    fsPromises.readFile = jest.fn().mockResolvedValue(mockContent);

    const content = await file.getContent();
    expect(content).toBe(mockContent);
    expect(fsPromises.readFile).toHaveBeenCalledWith(filePath, 'utf-8');
  });

  it('should cache file content after first read', async () => {
    const filePath = `${MOCK_PATH}/file1.ts`;
    const file = new File('file1.ts', filePath);
    
    const mockContent = getContent('/root/file1.ts');
    fsPromises.readFile = jest.fn().mockResolvedValue(mockContent);

    await file.getContent();
    await file.getContent();

    // getContent should only read the file once and cache the content
    expect(fsPromises.readFile).toHaveBeenCalledTimes(1);
  });
});
