import classNames from 'classnames';

// The props for the component
type Props = {
  id?: string;
  value?: string; // The value of the input
  forwardRef?: React.Ref<HTMLInputElement>;
  type?: 'date' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'url'; // The type of the input
  color?: 'primary'; // The color variant
  placeholder?: string; // The placeholder
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void; // The change handler
  disabled?: boolean; // If the input is disabled
  readOnly?: boolean; // If the input is read only
  autoFocus?: boolean; // If the input should be focused on mount
  /*
  leftIcon?: React.ReactNode | null; // The left icon
  rightIcon?: React.ReactNode | null; // The right icon
  */
  floatingLabel?: boolean; // If the input has a floating label
  className?: string;
};

// The component
export default function InputText({
  id,
  value,
  forwardRef,
  type = 'text',
  color = 'primary',
  autoFocus = false,
  placeholder,
  changeHandler,
  disabled,
  readOnly,
  floatingLabel,
  className
}: Props) {
  // Define the color variants
  const colorVariants = {
    primary:
      'bg-white text-ebony border-2 border-primary focus:(ring ring-primary/20) dark:(bg-white/5 text-white) placeholder-gray :-moz-autofill:bg-red-500 outline-none'
  };

  // Return the input
  return (
    <>
      <div className="group relative z-0">
        <input
          id={id}
          ref={forwardRef}
          type={type}
          value={value}
          autoFocus={autoFocus}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // If the input is not read only, disabled or the change handler is undefined, call the change handler
            if (!readOnly && !disabled && changeHandler !== undefined) {
              changeHandler(e); // Call the change handler
            }
          }}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={floatingLabel ? ' ' : placeholder}
          className={classNames(
            'peer appearance-none h-[70px]',
            'flex items-center gap-2',
            'transition duration-200 font-regular text-base rounded-xl',
            floatingLabel ? 'pt-7 pb-2 px-4' : 'py-4 px-4',
            colorVariants[color],
            disabled && 'opacity-70 cursor-not-allowed',
            className
          )}
        />
        {floatingLabel && (
          <label
            htmlFor={id}
            className={classNames(
              'absolute transform duration-300 px-4',
              'cursor-text',
              'top-6 z-10 origin-[0] -translate-y-4',
              'peer-placeholder-shown:(translate-y-0) peer-focus:(-translate-y-4)',
              'text-gray'
            )}
          >
            {placeholder}
          </label>
        )}
      </div>
    </>
  );
}
