import { Warning } from "phosphor-react";

type AlertFormErrorProps = {
  message: string;
};
export default function AlertFormError({
  message,
}: AlertFormErrorProps): JSX.Element {
  return (
    <div className="flex items-center space-x-1 pt-2">
      <Warning color="red" /> <p className="text-red-500 text-xs ">{message}</p>
    </div>
  );
}
