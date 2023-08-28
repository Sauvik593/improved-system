import { clipboardCopy } from '../../../helpers/clipboardCopy';

export function useClipboardCopy(content: string) {
  const copy = async () => {
    clipboardCopy(content);
  };

  return { copy };
}
