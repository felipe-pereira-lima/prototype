import clsx from "clsx";

export interface RadioButtonProps<T> {
  label?: string;
  layout?: "horizontal" | "vertical";
  onChange?(option: T): void;
  options: T[];

  value?: T;

  valueKey(obj: T): string;

  valueLabel(obj: T): string;
}

export function RadioButton<T>({
  label,
  layout = "horizontal",
  onChange,
  options,
  value,
  valueKey,
  valueLabel,
}: RadioButtonProps<T>): JSX.Element {
  return (
    <div>
      {label && (
        <div className="my-2 h-5 text-black">
          <span>{label}</span>
        </div>
      )}
      <div
        className={clsx("flex", {
          "flex-col gap-y-1": layout === "vertical",
          "gap-x-4": layout === "horizontal",
        })}
      >
        {options.map((option) => (
          <div key={valueKey(option)} className="flex items-center">
            <input
              checked={value && valueKey(value) === valueKey(option)}
              className="border-gray-300 text-blue-500 focus:ring-blue-500"
              id={valueKey(option)}
              type="radio"
              onChange={() => {
                onChange?.(option);
              }}
            />
            <label
              className="block pl-2 text-xs font-medium text-gray-700"
              htmlFor={valueKey(option)}
            >
              {valueLabel(option)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
