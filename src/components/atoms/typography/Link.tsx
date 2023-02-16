import classNames from 'classnames';
import { useRouter } from 'next/router';

// The props for the component
type Props = {
  children: React.ReactNode;
  className?: string;

  href?: string;
  title?: string;
  target?: string;
};

// The link component
export default function Link({
  children,
  className,
  href,
  title,
  target
}: Props) {
  // Get the router
  const router = useRouter();

  // Return the link component
  return (
    <a
      href={href && href.startsWith('/') ? `/${router.locale}${href}` : href}
      title={title}
      target={target}
      className={classNames(
        'transition duration-300 font-medium text-primary dark:text-white hover:underline',
        className
      )}
    >
      {children}
    </a>
  );
}
