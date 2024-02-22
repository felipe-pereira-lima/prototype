import { Button } from "../button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../drawer";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

export default function SelfAssessmentDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="flex justify-center">
        <DrawerHeader className="mt-2">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="outline" onClick={onCancel}>
            No
          </Button>
          <Button onClick={onConfirm}>Yes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
