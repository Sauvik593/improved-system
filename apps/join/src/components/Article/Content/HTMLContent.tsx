import cn from 'classnames';

interface Props {
  content: string;
  id: number;
  className?: string;
}

export const HTMLContent = ({ className, content, id }: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={cn(`article-content heading-hooks`, className)}
      data-article-component
      id={`heading_${id}`}
    />
  );
};

HTMLContent.displayName = 'HTMLContent';
