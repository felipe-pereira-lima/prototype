import { ReactNode } from "react";

import {
  CheckCircle,
  IconProps,
  Info,
  Warning,
  XCircle,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { Indicator } from "./utils/types";

export type AlertMode = "error" | "warning";

interface AlertProps {
  button?: ReactNode;
  children?: ReactNode;
  message: string;
  mode: Indicator;
}

export function Alert({
  button,
  children,
  message,
  mode,
}: AlertProps): JSX.Element {
  const iconProps: IconProps = {
    "aria-hidden": true,
    size: 18,
    weight: "fill",
  };

  return (
    <div
      className={clsx(
        {
          "border-blue-500 bg-blue-50": mode === "info",
          "border-red-500 bg-red-50": mode === "danger",
          "border-green-500 bg-green-50": mode === "success",
          "border-yellow-500 bg-yellow-50": mode === "warning",
        },
        "rounded-md border border-solid p-2.5"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0 self-center">
          {mode === "danger" && (
            <XCircle className="text-red-500" {...iconProps} />
          )}
          {mode === "warning" && (
            <Warning className="text-yellow-500" {...iconProps} />
          )}
          {mode === "success" && (
            <CheckCircle className="text-green-500" {...iconProps} />
          )}
          {mode === "info" && <Info className="text-blue-500" {...iconProps} />}
        </div>
        <div className="ml-3 flex-1 items-center md:flex md:justify-between">
          <p
            className={clsx(
              {
                "text-blue-700": mode === "info",
                "text-danger-700": mode === "danger",
                "text-success-700": mode === "success",
                "text-warning-700": mode === "warning",
              },
              "text-sm font-medium"
            )}
          >
            {message}
          </p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0">{button}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
