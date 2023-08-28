import { PullService } from '.';
import { Env } from '../helpers/env';
import { Downloader } from './downloader';
import { FilesWriter } from './files-writer';

describe('PullService', () => {
  describe('.call', async () => {
    describe("when it's valid", () => {
      beforeAll(() => {
        vi.spyOn(Env.prototype, 'wtiKey', 'get').mockReturnValue('wtiKey');
        vi.spyOn(Env.prototype, 'wtiTarget', 'get').mockReturnValue('wtiTarget');
      });
      it('should call the downloader and filesWriter', async () => {
        const downloaderMock = {
          call: vi.fn().mockResolvedValue('files'),
        };
        const filesWriterMock = {
          call: vi.fn(),
        };
        const pullService = new PullService();

        pullService.downloader = downloaderMock as unknown as Downloader;
        pullService.filesWriter = filesWriterMock as unknown as FilesWriter;

        await pullService.call();

        expect(downloaderMock.call).toHaveBeenCalled();
        expect(filesWriterMock.call).toHaveBeenCalledWith('files');
      });
    });
    describe('when env vars are missing', () => {
      describe('when wtiKey is missing', () => {
        it('should throw an error', () => {
          vi.spyOn(Env.prototype, 'wtiKey', 'get').mockReturnValue(undefined);
          vi.spyOn(Env.prototype, 'wtiTarget', 'get').mockReturnValue('target');

          const pullService = new PullService();
          expect(pullService.call()).rejects.toThrowError('Missing env var!');
        });
      });
      describe('when wtiTarget is missing', () => {
        it('should throw an error', () => {
          vi.spyOn(Env.prototype, 'wtiKey', 'get').mockReturnValue('key');
          vi.spyOn(Env.prototype, 'wtiTarget', 'get').mockReturnValue(undefined);

          const pullService = new PullService();
          expect(pullService.call()).rejects.toThrowError('Missing env var!');
        });
      });
      describe('when wtiKey and wtiTarget are missing', () => {
        it('should throw an error', () => {
          vi.spyOn(Env.prototype, 'wtiKey', 'get').mockReturnValue(undefined);
          vi.spyOn(Env.prototype, 'wtiTarget', 'get').mockReturnValue(undefined);

          const pullService = new PullService();
          expect(pullService.call()).rejects.toThrowError('Missing env var!');
        });
      });
    });
  });
});
