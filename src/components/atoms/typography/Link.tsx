import classNames from 'classnames';

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
  // Return the link component
  return (
    <a
      href={href}
      title={title}
      target={target}
      className={classNames('font-semibold text-primary', className)}
    >
      {children}
    </a>
  );
}
