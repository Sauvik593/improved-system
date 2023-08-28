import { useState } from 'react';

import { Header } from './Header';
import { FormView } from './Form/FormView';
import { useSubmitComment } from './useSubmitComments';
import { SuccessView } from './Form/SuccessView';
import { CommentElement } from './Comment';

import type { Comment } from '@lib/types';
import type { ReplyData } from '@lib/api/strapi/addComment';

interface Props {
  id: number;
  comments: Comment[];
}

export const Comments = ({ id, comments }: Props) => {
  const { submitReply, submit, addState, replyState } = useSubmitComment();
  const [parent, setParent] = useState<ReplyData | undefined>(undefined);
  const [reply, setReply] = useState(false);

  const toggleReply = (parent?: ReplyData): void => {
    setParent(parent);
    setReply(true);
  };

  const closeReply = (): void => {
    setParent({ parentId: undefined, user: '' });
    setReply(false);
  };

  const sortComments = (a: Comment, b: Comment): number => {
    const aId = a.parent ? a.parent.id : a.id;
    const bId = b.parent ? b.parent.id : b.id;
    return aId - bId;
  };

  const renderAddView = (): React.ReactNode => {
    switch (addState) {
      case 'success':
        return <SuccessView onSubmit={submit} id={id} />;
      case 'form':
        return <FormView onSubmit={submit} id={id} />;
      default:
        return null;
    }
  };

  const renderReplyView = (): React.ReactNode => {
    switch (replyState) {
      case 'replied':
        return <SuccessView onSubmit={submitReply} id={id} parent={parent} onClose={closeReply} />;
      case 'form':
        return <FormView onClose={closeReply} onSubmit={submitReply} id={id} parent={parent} />;
      default:
        return null;
    }
  };

  return (
    <section className="container mx-auto my-10">
      <div className="lg:w-8/12">
        <Header commentsLength={comments.length} />
        <ul>
          {comments.sort(sortComments).map((comment) => {
            return (
              <li key={comment.id}>
                <CommentElement
                  comment={comment}
                  onClick={() => toggleReply({ parentId: comment.id, user: comment.name })}
                />
                {reply && comment.id === parent?.parentId && (
                  <div className="mt-6 mb-8 rounded-lg bg-white p-4">{renderReplyView()}</div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-6 rounded-lg bg-white p-4">{renderAddView()}</div>
      </div>
    </section>
  );
};
