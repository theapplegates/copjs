import classNames from 'classnames';

// The props for the component
type Props = {
  children?: React.ReactNode;
  className?: string;
};

// The component
export default function H1({ children, className }: Props) {
  // Return the component
  return (
    <h1 className={classNames('text-3xl font-bold', className)}>{children}</h1>
  );
}
