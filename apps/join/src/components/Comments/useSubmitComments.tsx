import { useState } from 'react';
import { addComment, CommentForm } from '@lib/api/strapi/addComment';

interface SubmitCommentProps {
  submit: (payload: CommentForm) => void;
  submitReply: (payload: CommentForm) => void;
  addState: string;
  replyState: string;
}

export const useSubmitComment = (): SubmitCommentProps => {
  const [addState, setState] = useState('form');
  const [replyState, setReplyState] = useState('form');

  const submit = async (payload: CommentForm): Promise<void> => {
    await addComment(payload);
    setState('success');
    setTimeout(() => setState('form'), 3000);
  };

  const submitReply = async (payload: CommentForm): Promise<void> => {
    await addComment(payload);
    setReplyState('replied');
    setTimeout(() => setReplyState('form'), 3000);
  };

  return { submitReply, submit, addState, replyState };
};
