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
        'bg-white text-ebony dark:(bg-ebony-400 text-white) p-8 rounded-xl shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
