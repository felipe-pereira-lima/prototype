import { ReactNode, useId } from "react";
import Select, {
  ActionMeta,
  GroupBase,
  InputActionMeta,
  MenuPlacement,
  MultiValue,
  SingleValue,
  StylesConfig,
} from "react-select";
import CreatableSelect from "react-select/creatable";

import clsx from "clsx";
import { SelectComponents } from "node_modules/react-select/dist/declarations/src/components";

interface BaseProps<T> {
  autoFocus?: boolean;
  clearable?: boolean;
  components?: Partial<SelectComponents<T, false, GroupBase<T>>> | undefined;
  creatable?: boolean;
  disabled?: boolean;
  label?: string;
  size?: string;
  formatCreateLabel?: (newValue: string) => ReactNode;
  fullWidth?: boolean;
  height?: string;
  hideSelectedOptions?: boolean;
  inputValue?: string;
  isLoading?: boolean;
  isOptionDisabled?(option: T): boolean;
  isSearchable?: boolean;
  menuPlacement?: MenuPlacement;

  onCreateOption?: (newValue: string) => void;

  onInputChange?(
    newValue: string,
    actionMeta: InputActionMeta | undefined
  ): void;

  onMenuScrollToBottom?(): void;

  onSelection?(
    newValue: SingleValue<T> | MultiValue<T>,
    actionMeta: ActionMeta<T>
  ): void;

  options: T[];

  placeholder?: string;

  required?: boolean;

  sort?(objs: T[]): T[];

  valueKey(obj: T): string;
  valueLabel(obj: T): string;
}

interface SingleSelectProps<T> extends BaseProps<T> {
  defaultValue?: SingleValue<T>;
  initialValue?: SingleValue<T>;
  isMulti?: false;
}

interface MultiSelectProps<T> extends BaseProps<T> {
  defaultValue?: MultiValue<T>;
  initialValue?: MultiValue<T>;
  isMulti: true;
}

export type ComboBoxProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

export function ComboBox<T>({
  autoFocus,
  clearable = true,
  components,
  creatable = false,
  defaultValue,
  disabled = false,
  formatCreateLabel,
  fullWidth = false,
  hideSelectedOptions = false,
  initialValue,
  inputValue,
  isLoading,
  isMulti = false,
  isOptionDisabled,
  isSearchable,
  label,
  menuPlacement = "auto",
  onCreateOption,
  onInputChange,
  onMenuScrollToBottom,
  onSelection,
  options,
  placeholder,
  required,
  size = "medium",
  sort,
  valueKey,
  valueLabel,
}: ComboBoxProps<T>): JSX.Element {
  const id = useId();

  const values = sort ? sort(options) : options;

  // Select the appropriate React Select component based on the 'creatable' prop
  const SelectComponent = creatable ? CreatableSelect : Select;

  return (
    <div
      className={clsx(
        {
          "min-w-[120px]": !fullWidth,
          "w-full": fullWidth,
        },
        "z-50 relative space-y-1"
      )}
    >
      {label && (
        <div className="flex justify-between">
          <span>{label}</span>
        </div>
      )}

      <SelectComponent<T>
        autoFocus={autoFocus}
        blurInputOnSelect={true}
        classNames={{
          clearIndicator: () => clsx("!py-0"),
          // classNames have to be used with !important to overwrite default styles
          control: (state) =>
            clsx("!rounded !text-black !px-0 !min-h-[26px]", {
              "!bg-gray-100": state.isDisabled,
              "!border-blue-500 !border !ring-1 !ring-blue-500":
                state.isFocused,

              "!text-base": size === "large",
              "!text-sm": size === "medium",
              "!text-xs": size === "small",
            }),
          dropdownIndicator: () => clsx("!p-0 !px-2"),
          input: () => clsx("!p-0 !m-0"),
          menu: () => clsx("!text-xs"),
          multiValue: () => clsx("!rounded-xl !text-xs !m-0 !leading-3"),
          multiValueRemove: (state) =>
            clsx("hover:!bg-gray-300 !rounded-r-xl", {
              hidden: state.isDisabled,
            }),
          valueContainer: () =>
            clsx("!px-3", {
              "!py-1": size === "small",
              "!py-2": size === "medium",
              "!py-4": size === "large",
            }),
        }}
        components={components}
        createOptionPosition="first"
        defaultValue={defaultValue}
        formatCreateLabel={formatCreateLabel}
        getOptionLabel={(option: T) => valueLabel(option)}
        getOptionValue={(option: T) => valueKey(option)}
        hideSelectedOptions={hideSelectedOptions}
        id={id}
        inputValue={inputValue}
        isClearable={clearable}
        isDisabled={disabled}
        isLoading={isLoading}
        isMulti={!!isMulti as false}
        isOptionDisabled={(option: T) =>
          isOptionDisabled ? isOptionDisabled(option) : false
        }
        isSearchable={isSearchable}
        menuPlacement={menuPlacement}
        name={label}
        options={values ?? []}
        placeholder={placeholder}
        styles={customStyles}
        value={initialValue}
        onChange={onSelection}
        onCreateOption={onCreateOption}
        onInputChange={onInputChange}
        onMenuScrollToBottom={onMenuScrollToBottom}
      />

      {/* error, to do */}
    </div>
  );
}

const customStyles: StylesConfig<any, false, any> = {
  input: (provided, state) => ({
    ...provided,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};
