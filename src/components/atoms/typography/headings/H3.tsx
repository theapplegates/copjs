import classNames from 'classnames';

// The props for the component
type Props = {
  children?: React.ReactNode;
  className?: string;
};

// The component
export default function H3({ children, className }: Props) {
  // Return the component
  return (
    <h3 className={classNames('text-xl font-bold', className)}>{children}</h3>
  );
}
