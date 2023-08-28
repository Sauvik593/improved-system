import axios from 'axios';

import { getApiUrl } from '@helpers/assetsUrl';

export interface ReplyData {
  parentId: number | undefined;
  user: string;
}

export interface CommentForm {
  content: string;
  approved: boolean;
  name: string;
  email: string;
  locale: string;
  article?: number;
  terms: boolean;
  parent?: ReplyData;
}

export async function addComment(payload: CommentForm): Promise<boolean> {
  const result = await axios.post(getApiUrl('/comment'), payload);
  return result && result.status === 200 && result.data.result;
}
