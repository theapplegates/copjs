import classNames from 'classnames';

// The props for the component
type Props = {
  children: React.ReactNode;
  className?: string;
};

// The subtitle component
export default function Subtitle({ children, className }: Props) {
  // Return the subtitle
  return (
    <div
      className={classNames(
        'text-gray-600 dark:text-gray-400 text-md font-normal',
        className
      )}
    >
      {children}
    </div>
  );
}
