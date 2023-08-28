import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { createValidationSchema } from './ValidationSchema';
import { ReplyCommentHeader, AddCommentHeader } from './FormHeader';
import { type CommentForm as CommentData, type ReplyData } from '@lib/api/strapi/addComment';

import { CommentForm } from './CommentForm';

interface Props {
  onClose?: () => void;
  onSubmit: (payload: CommentData) => void;
  id: number;
  parent?: ReplyData;
}

export const SuccessView: React.FunctionComponent<Props> = ({ id, onClose, onSubmit, parent }) => {
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentData>({
    resolver: yupResolver(createValidationSchema(t)),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-2 md:mx-0">
      {!parent ? <AddCommentHeader /> : <ReplyCommentHeader parent={parent} />}
      <CommentForm id={id} parent={parent} register={register} errors={errors} onClose={onClose} />
      <div className="success-tooltip text-sierra-night-100 my-1 flex items-center">
        <p className="text-sunshine-100 text-p-1 mx-2">&#x2713;</p>
        <p>{t('content.comments.success')}</p>
      </div>
    </form>
  );
};
