import classNames from 'classnames';

// The props for the component
type Props = {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
  color?: 'primary' | 'secondary' | 'cornflower-blue';
  icon?: React.ReactNode | null;
  className?: string;
};

// The button component
export default function Button({
  type = 'button',
  children,
  clickHandler,
  disabled,
  isLoading,
  color = 'primary',
  icon,
  className
}: Props) {
  // Define the color variants
  const colorVariants = {
    secondary:
      'bg-transparent border-2 border-black hover:(bg-black text-white) text-black dark:(border-white text-white) dark:hover:(bg-white text-black) focus:(ring ring-gray-400) dark:focus:(ring ring-gray-400)',
    primary:
      'bg-black text-white dark:(bg-white text-black) focus:(ring ring-gray-400) dark:focus:(ring ring-gray-400)',
    'cornflower-blue':
      'bg-cornflower-blue-500 focus:(ring ring-cornflower-blue-400) text-white'
  };

  // Return the button
  return (
    <button
      type={type}
      onClick={e => {
        // If the button is not loading, disabled or the click handler is undefined, call the click handler
        if (!isLoading && !disabled && clickHandler !== undefined) {
          clickHandler(e); // Call the click handler
        }
      }}
      disabled={isLoading || disabled} // Disable the button if it is loading or disabled
      className={classNames(
        'flex items-center gap-2',
        'transition duration-200 font-semibold rounded-md py-2 px-5',
        colorVariants[color],
        (isLoading || disabled) && 'opacity-70 cursor-not-allowed',
        className
      )}
    >
      {isLoading ? (
        <svg
          className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
