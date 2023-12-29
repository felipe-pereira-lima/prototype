export type Size = "small" | "medium" | "large";
export type Indicator = "default" | "warning" | "success" | "info" | "danger";

export interface BaseInputElementProps {
  /**
   * Universal Size Prop for `ui components`.
   */
  size?: Size;
}

export type NavigationItem = {
  name: string;
  href: string;
  submenu?: NavigationItem[];
};
