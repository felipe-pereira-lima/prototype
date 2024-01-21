// app/components/GlobalLoading.tsx
import { useNavigation } from "@remix-run/react";
import { Spinner } from "~/components/ui/spinner";

export default function GlobalLoading() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-500 bg-opacity-75 text-white">
        <Spinner />
      </div>
    );
  }

  return null;
}
