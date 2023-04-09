import classNames from 'classnames';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  className?: string;

  href: string;
  title?: string;
  target?: string;
};

export default function Link({
  children,
  className,
  href,
  title,
  target
}: Props) {
  const params = useParams();

  return (
    <NextLink
      href={`/${params?.lang || ''}${href}`}
      title={title}
      target={target}
      className={classNames(
        'transition duration-300 font-medium text-primary dark:text-primary-300 hover:underline',
        className
      )}
    >
      {children}
    </NextLink>
  );
}
