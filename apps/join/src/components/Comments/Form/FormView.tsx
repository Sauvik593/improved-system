import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { type CommentForm as CommentData, type ReplyData } from '@lib/api/strapi/addComment';

import { createValidationSchema } from './ValidationSchema';
import { ReplyCommentHeader, AddCommentHeader } from './FormHeader';

import { CommentForm } from './CommentForm';

interface Props {
  onClose?: () => void;
  onSubmit: (payload: CommentData) => void;
  id: number;
  parent?: ReplyData;
}

export const FormView: React.FunctionComponent<Props> = ({ id, onClose, onSubmit, parent }) => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentData>({
    resolver: yupResolver(createValidationSchema(t)),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:mx-0">
      {!parent ? <AddCommentHeader /> : <ReplyCommentHeader parent={parent} />}
      <CommentForm id={id} parent={parent} register={register} errors={errors} onClose={onClose} />
    </form>
  );
};
