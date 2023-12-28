import clsx from "clsx";

import { Size } from "./utils/types";

export type ButtonColors = "primary" | "secondary" | "ghost";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "className"> {
  /**
   * Button color scheme.
   */
  color?: ButtonColors;

  /**
   * This prop is used internally in the `ui-components` and should not be used to overwrite button styles.
   */
  customClassName?: string;

  eventStopPropagation?: boolean;

  fullWidth?: boolean;

  /**
   * Disables the button and shows a loading indicator instead of the buttons content/label.
   */
  isLoading?: boolean;

  /**
   * Content of the button. Equivalent to passing `children`.
   * DISCUSS: should button take label or children? - children would be more extensible, label more strict
   *          when using label we should extend the component to also take an Icon prop.
   */
  label?: string;

  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Calls the passed function `onClick` with `label` as argument. Used to hook into buttons click event to call analytics.
   */
  onTracking?: (identifier: string | undefined) => void;
  /**
   * Defines the size of the button.
   */
  size?: Size;
  hasHover?: boolean;
  tooltipTitle?: string | undefined;
  /**
   * Defines the variant of the button.
   */
  variant?: "default" | "round" | "square" | "ghost";
}

export function Button({
  children,
  color = "primary",
  customClassName,
  disabled = false,
  eventStopPropagation = false,
  fullWidth = false,
  hidden = false,
  isLoading,
  hasHover,
  label,
  onClick,
  onTracking,
  size = "medium",
  tooltipTitle,
  type = "button",
  variant = "default",
  ...props
}: ButtonProps): JSX.Element {
  const isDisabled = disabled || isLoading;

  const button = (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center gap-x-2 border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        {
          "bg-gray-100": color === "secondary" && isDisabled,

          // primary style
          "border-transparent bg-blue-500 text-white": color === "primary",

          // secondary style
          "border-gray-300 bg-white text-gray-700": color === "secondary",

          "hover:bg-blue-600": color === "primary" && !isDisabled && hasHover,
          "hover:bg-gray-100": color === "secondary" && !isDisabled && hasHover,
          "p-1": size === "small" && variant !== "default",
          "p-2": size === "medium" && variant !== "default",
          "p-4": size === "large" && variant !== "default",

          // ghost
          "focus: border-transparent bg-transparent text-gray-700":
            color === "ghost",
          hidden,
          "hover:bg-blue-500 hover:text-white":
            color === "ghost" && !disabled && hasHover,
          "p-1 ": size === "small" && variant !== "default",
          "p-2 ": size === "medium" && variant !== "default",
          "p-4 ": size === "large" && variant !== "default",

          // variant sizes
          "px-2 py-1 ": size === "small" && variant === "default",
          "px-4 py-2": size === "medium" && variant === "default",
          "px-6 py-4": size === "large" && variant === "default",

          // variants
          rounded: variant === "default" || variant === "square",

          "rounded-full": variant === "round",
          "text-base leading-6": size === "large",
          "text-sm leading-6": size === "medium",

          // sizes
          "text-xs leading-4": size === "small",

          // misc
          "w-full": fullWidth,
        },
        // used internally
        customClassName
      )}
      disabled={isDisabled}
      type={type}
      onClick={(event) => {
        if (eventStopPropagation) {
          event.stopPropagation();
        }
        onClick?.(event);
        event.currentTarget.blur();
        onTracking?.(label);
      }}
    >
      {/* {isLoading ? <spinner /> : null} */}
      {label}
      {children}
    </button>
  );

  return button;
}
