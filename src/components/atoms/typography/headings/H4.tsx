import classNames from 'classnames';

// The props for the component
type Props = {
  children?: React.ReactNode;
  className?: string;
};

// The component
export default function H4({ children, className }: Props) {
  // Return the component
  return (
    <h4 className={classNames('text-lg font-bold', className)}>{children}</h4>
  );
}
