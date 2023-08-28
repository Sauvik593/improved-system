import { useContext } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { CommentForm as CommentData, ReplyData } from '@lib/api/strapi/addComment';

import { LanguageContext } from '@contexts/LanguageContext';
import { BaseInput } from '@components/common/FormInputs/BaseInput';
import { TextAreaInput } from '@components/common/FormInputs/TextAreaInput';
import { HiddenInput } from '@components/common/FormInputs/HiddenInput';
import { CheckboxInput } from '@components/common/FormInputs/CheckboxInput';
import { Button } from '@kyero/ui';

interface Props {
  id: number;
  parent?: ReplyData;
  register: UseFormRegister<CommentData>;
  onClose?: () => void;
  errors: FieldErrors<CommentData>;
}

export const CommentForm = ({ errors, register, id, parent, onClose }: Props) => {
  const { locale } = useContext(LanguageContext);
  const { t } = useTranslation('common');

  return (
    <>
      <div className="mb-6 gap-6 md:flex">
        <div className="w-full">
          <BaseInput
            name="name"
            className="mt-2 h-10"
            label={t('content.comments.placeholders.name')}
            error={errors.name}
            register={register}
          />
        </div>
        <div className="w-full">
          <BaseInput
            name="email"
            className="mt-2 h-10"
            label={t('content.comments.placeholders.email')}
            error={errors.email}
            register={register}
          />
        </div>
      </div>
      <TextAreaInput
        name="content"
        className="mt-2 h-28"
        label={t('content.comments.placeholders.comment')}
        register={register}
      />
      <HiddenInput name="article" register={register} value={id} />
      {parent && <HiddenInput name="parent" register={register} value={parent.parentId} />}
      <HiddenInput name="locale" register={register} value={locale} />
      <div className="mt-4 flex gap-2">
        <CheckboxInput name="terms" register={register} />
        <div
          className="comment-terms"
          dangerouslySetInnerHTML={{
            __html: t('content.comments.terms', { interpolation: { escapeValue: false } }),
          }}
        />
      </div>
      {errors.terms && <p className="text-terracotta-100 mt-2 px-2">{errors.terms.message}</p>}
      <div className="mt-4 md:flex">
        <div>
          <Button
            buttonType="blue"
            variant="full"
            type="submit"
            className="mr-4"
            message={t('content.comments.cta.post')}
          />
        </div>
        {parent && (
          <div>
            <Button
              className="mt-4 md:mt-0"
              buttonType="blue"
              variant="outline"
              onClick={onClose}
              message={t('content.comments.cta.cancel')}
            />
          </div>
        )}
      </div>
    </>
  );
};
