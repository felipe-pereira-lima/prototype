import { ReactNode } from "react";
import { Size } from "./utils/types";
import clsx from "clsx";

export interface CardProps {
  children: ReactNode;
  label?: string;
  size?: Size;
  customClassName?: string;
}

export default function Card({
  children,
  label,
  size,
  customClassName,
}: CardProps) {
  return (
    <div
      className={clsx("flex-grow rounded-md bg-white shadow", customClassName)}
    >
      <div
        className={clsx(
          "flex flex-row items-center justify-between px-4 text-sm font-bold tracking-[.015em] text-blueGray-600",
          size === "small" && "w-20"
        )}
      >
        <div className="flex items-start gap-x-1">
          <span className="uppercase">{label}</span>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
