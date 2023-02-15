import classNames from 'classnames';

// The props for the component
type Props = {
  children?: React.ReactNode;
  className?: string;
};

// The component
export default function H2({ children, className }: Props) {
  // Return the component
  return (
    <h2 className={classNames('text-2xl font-bold', className)}>{children}</h2>
  );
}
