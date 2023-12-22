import * as React from "react";
import { Size } from "./utils/types";
import clsx from "clsx";

export interface InputProps {
  /**
   * This prop is used internally and should not be used to overwrite input styles.
   */
  customClassName?: string;

  /**
   * Size of the input field.
   */
  size?: Size;

  /**
   * Calls the passed function `onChange` with the input's value as an argument.
   * Used to hook into input's change event for analytics or additional processing.
   */
  onChange?: (value: any) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ customClassName, size = "medium", onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <input
        {...props}
        ref={ref}
        className={clsx(
          "flex w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          size === "small" && "h-8 text-xs",
          size === "medium" && "h-10",
          size === "large" && "h-12 text-base",
          customClassName
        )}
        onChange={handleChange}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
