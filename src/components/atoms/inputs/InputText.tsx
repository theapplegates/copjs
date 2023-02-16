import classNames from 'classnames';
import React from 'react';

import style from '@/components/atoms/inputs/InputText.module.css';

// The props for the component
type Props = {
  id?: string;
  value?: string; // The value of the input
  forwardRef?: any;
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
  const ref = forwardRef || React.createRef();

  // Define the color variants
  const colorVariants = {
    primary:
      'bg-transparent text-ebony border border-secondary hover:(border-2 border-primary) focus:(border-2 border-primary) dark:(bg-transparent text-white) dark:hover:(border-white) dark:focus:(border-white) placeholder-gray outline-none'
  };

  // Return the input
  return (
    <>
      <div className="group relative z-0">
        <input
          id={id}
          ref={ref}
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
            'peer appearance-none h-[70px] w-full',
            'flex items-center gap-2',
            'transition duration-200 font-regular text-base rounded-xl',
            floatingLabel ? 'pt-7 pb-2 px-4' : 'py-4 px-4',
            colorVariants[color],
            disabled && 'opacity-70 cursor-not-allowed',
            className,
            style.input
          )}
        />
        {floatingLabel && (
          <label
            htmlFor={id}
            onClick={() => {
              if (forwardRef?.current) {
                forwardRef.current.focus();
              }
            }}
            className={classNames(
              'absolute transform duration-300 px-4',
              'cursor-text select-none',
              'top-6 -z-10 origin-[0] -translate-y-4',
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
