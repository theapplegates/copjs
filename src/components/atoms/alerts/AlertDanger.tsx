import classNames from 'classnames';

// The props for the component
type Props = {
  children: React.ReactNode;
  className?: string;
};

// The component
export default function AlertDanger({ children, className }: Props) {
  // Return the component
  return (
    <div
      className={classNames(
        'bg-red-100 text-red-900 my-2 p-4 rounded-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
