import axios from 'axios';
import { Env } from '@lib/env';
import { CommentForm } from './addComment';

interface CommentAddRequestBody extends CommentForm {
  date: string;
}

export class Comments {
  async add(comment: CommentForm): Promise<boolean> {
    try {
      const preparedFields = this.prepareFields(comment);
      const result = await axios.post(
        `${Env.strapiUrl}/api/join-comments`,
        {
          data: {
            ...preparedFields,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${Env.strapiToken}`,
          },
        },
      );
      return result && result.status === 200 && result.data.id;
    } catch {
      return false;
    }
  }

  prepareFields(comment: CommentForm): CommentAddRequestBody {
    return {
      ...comment,
      date: new Date().toISOString(),
      parent: comment.parent ? comment.parent : undefined,
      approved: false,
    };
  }
}
