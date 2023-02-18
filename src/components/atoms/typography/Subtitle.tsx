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
        'text-gray dark:text-gray-300 text-base font-regular',
        className
      )}
    >
      {children}
    </div>
  );
}
