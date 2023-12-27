import { useId } from "react";

import { MagnifyingGlass } from "@phosphor-icons/react";
import clsx, { ClassValue } from "clsx";
import { Size } from "./utils/types";

// TODO: extend default html `input` props
export interface BaseProps {
  autoComplete?: string;
  disabled?: boolean;
  label?: string;
  maxLength?: number;
  min?: number;
  placeholder?: string;
  recommendedMaxLength?: number;
  required?: boolean;
  showCharacterCount?: boolean;
  showMaxLength?: boolean;
  size?: Size;

  onBlur?: () => void;

  onDoubleClick?: (e: React.MouseEvent<HTMLInputElement>) => void;

  onFocus?: () => void;
}

export interface TypeText extends BaseProps {
  defaultValue?: string;
  type: "text" | "email" | "search" | "password";
  value?: string | undefined;

  onChange?(value: string): void;

  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export interface TypeNumber extends BaseProps {
  defaultValue?: number | undefined;
  type: "number";
  value?: number | undefined;

  onChange?(value: number | undefined): void;

  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export type TextFieldProps = TypeText | TypeNumber;

export function TextField({
  defaultValue,
  disabled = false,
  label,
  maxLength,
  min,
  placeholder,
  size = "medium",
  type,
  value,

  onBlur,
  onChange,
  onDoubleClick,
  onFocus,
  onKeyDown,
}: TextFieldProps): JSX.Element {
  const id = useId();

  // size definitions are splitted to use with custom `text`
  const textSizes: ClassValue = {
    "text-base": size === "large",
    "text-sm": size === "medium",
    "text-xs": size === "small",
  };

  const spacings: ClassValue = {
    "py-1": size === "small",
    "py-2": size === "medium",
    "py-4": size === "large",
  };

  return (
    <div className={clsx({ "space-y-1": label })}>
      <div className="flex-col">
        <div
          className="relative"
          data-testid={
            label?.replace(/ /g, "-").toLowerCase().concat("-textfield") ?? ""
          }
        >
          {type === "text" && (
            <div
              className={clsx(
                "form-input rounded border focus-within:border-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500",
                {
                  "bg-gray-100": disabled,

                  ...spacings,
                }
              )}
              onDoubleClick={onDoubleClick}
            >
              <textarea
                aria-describedby="required-error"
                className={clsx(
                  "flex w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  { ...textSizes }
                )}
                data-testid="textfield-text-test-id"
                defaultValue={defaultValue}
                disabled={disabled}
                id={id}
                maxLength={maxLength}
                name={label}
                placeholder={placeholder}
                rows={1}
                value={value}
                onBlur={onBlur}
                onChange={(event) => {
                  onChange?.(event.target.value);
                }}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                onKeyDownCapture={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                  }
                }}
              />
            </div>
          )}
          {type === "search" && (
            <div className="absolute left-2 flex h-full items-center text-gray-500">
              <MagnifyingGlass size={size === "small" ? 18 : 20} />
            </div>
          )}
          {type !== "text" && (
            <input
              aria-describedby="required-error"
              className={clsx(
                "flex w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                {
                  "bg-gray-100": disabled,

                  "pl-8": type === "search",
                  ...textSizes,
                  ...spacings,
                }
              )}
              data-testid="textfield-test-id"
              defaultValue={defaultValue}
              disabled={disabled}
              id={id}
              maxLength={maxLength}
              min={min}
              name={label}
              placeholder={placeholder}
              type={type}
              value={value}
              onBlur={onBlur}
              onChange={(event) => {
                if (type === "number") {
                  onChange?.(
                    event.target.value ? event.target.valueAsNumber : undefined
                  );
                } else {
                  onChange?.(event.target.value);
                }
              }}
              onDoubleClick={onDoubleClick}
              onFocus={onFocus}
            />
          )}
        </div>
      </div>
    </div>
  );
}
