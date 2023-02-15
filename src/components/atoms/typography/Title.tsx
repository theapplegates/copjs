import classNames from 'classnames';

// The props for the component
type Props = {
  children: React.ReactNode;
  className?: string;
};

// The title component
export default function Title({ children, className }: Props) {
  // Return the title
  return (
    <div className={classNames('text-xl font-medium', className)}>
      {children}
    </div>
  );
}
