import clsx from "clsx";
import { Size } from "./utils/types";

export interface SpinnerProps {
  inline?: boolean;
  label?: string;
  size?: Size;
}

export function Spinner({
  inline,
  label,
  size = "large",
}: SpinnerProps): JSX.Element {
  return (
    <div
      className={clsx("", {
        "inline-flex items-center gap-x-2": inline,
        "my-4 flex flex-col items-center justify-center gap-y-1": !inline,
      })}
    >
      <svg
        aria-hidden="true"
        className={clsx(
          "animate-spin fill-blue-600 text-gray-200 dark:text-gray-600",
          {
            "h-4 w-4": size === "small",
            "h-6 w-6": size === "medium",
            "h-8 w-8": size === "large",
          }
        )}
        fill="none"
        viewBox="0 0 100 101"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
          fill="currentColor"
        />
        <path
          d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
          fill="currentFill"
        />
      </svg>
      {label && (
        <div
          className={clsx({
            "text-base": size === "large",
            "text-sm": size === "medium",
            "text-xs": size === "small",
          })}
        >
          {label}
        </div>
      )}
    </div>
  );
}
