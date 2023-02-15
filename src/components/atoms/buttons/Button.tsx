import classNames from 'classnames';

// The props for the component
type Props = {
  forwardRef?: React.Ref<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
  color?: 'primary' | 'secondary' | 'cornflower-blue';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode | null;
  rightIcon?: React.ReactNode | null;
  className?: string;
};

// The button component
export default function Button({
  forwardRef,
  type = 'button',
  children,
  clickHandler,
  disabled,
  isLoading,
  color = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  className
}: Props) {
  // Define the color variants
  const colorVariants = {
    secondary:
      'bg-transparent border-2 border-primary hover:(bg-primary text-white) text-primary dark:(border-white text-white) dark:hover:(bg-white text-ebony) focus:(ring ring-primary/20) dark:focus:(ring ring-white/20)',
    primary:
      'bg-primary text-white dark:(bg-white text-primary) focus:(ring ring-primary/20) dark:focus:(ring ring-white/20)',
    'cornflower-blue':
      'bg-cornflower-blue-500 focus:(ring ring-cornflower-blue-400) text-white'
  };

  // Return the button
  return (
    <button
      ref={forwardRef}
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
        'transition duration-200 font-medium text-base rounded-xl py-4 px-5',
        size === 'small' && 'h-[48px]',
        size === 'medium' && 'h-[60px]',
        size === 'large' && 'h-[70px]',
        colorVariants[color],
        (isLoading || disabled) && 'opacity-70 cursor-not-allowed',
        className
      )}
    >
      {isLoading ? (
        <svg
          className="dark:text-ebony mr-3 -ml-1 h-5 w-5 animate-spin text-white"
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
        leftIcon
      )}
      {children}
      {rightIcon}
    </button>
  );
}
