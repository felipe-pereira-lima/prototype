import { Alert, AlertDescription, AlertTitle } from "../alert";
import { Button } from "../button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../drawer";
import { Switch } from "../switch";
import { Label } from "../label";
import { FileWarningIcon, RocketIcon } from "lucide-react";
import { useState } from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  isEmployeeAllowedToStart: boolean;
  setisEmployeeAllowedToStart: (value: boolean) => void;
}

export default function ConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  isEmployeeAllowedToStart,
  setisEmployeeAllowedToStart,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="flex justify-center">
        <Alert>
          <FileWarningIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription className="my-2">
            Would you like to allow this employee to start their
            self-assessment? Alternatively, you have the option to adjust this
            setting for individual reviews once they are completed.
          </AlertDescription>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isEmployeeAllowedToStart}
              onCheckedChange={setisEmployeeAllowedToStart}
            />
            <Label>Allow Employee to Start a Self-assessment</Label>
          </div>
        </Alert>

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
