import classNames from 'classnames';

// The props for the component
type Props = {
  children: React.ReactNode;
  className?: string;
};

// The card component
export default function Card({ children, className }: Props) {
  // Return the card
  return (
    <div
      className={classNames(
        'bg-white text-black dark:(bg-gray-800 text-white) p-8 rounded-lg shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
