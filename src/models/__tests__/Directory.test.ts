import { Directory } from "../Directory";
import { File } from "../File";
import { MOCK_PATH } from '../../__mocks__/mockFileSystem';

describe("Directory", () => {
  it('should add child documents', async () => {
    const directory = new Directory('root', `${MOCK_PATH}`);
    const file = new File('file1.ts', `${MOCK_PATH}/file1.ts`);

    await directory.addChild(file);

    expect(directory.children).toHaveLength(1);
    expect(directory.children[0]).toBe(file);
  });

  it('should get content of all children', async () => {
    const directory = new Directory('root', `${MOCK_PATH}`);
    const file1 = new File('file1.ts', `${MOCK_PATH}/file1.ts`);
    const file2 = new File('file2.js', `${MOCK_PATH}/file2.js`);

    jest.spyOn(file1, 'getContent').mockResolvedValue('content of file1.ts');
    jest.spyOn(file2, 'getContent').mockResolvedValue('content of file2.js');

    await directory.addChild(file1);
    await directory.addChild(file2);

    const content = await directory.getContent();

    expect(content).toBe('content of file1.ts\n\ncontent of file2.js');
  });
});