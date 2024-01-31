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
}

export default function ConfirmationDialog({
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
        <Alert>
          <FileWarningIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription className="my-2">
            Would you like to enable the visibility of your review for this
            employee at this time? Alternatively, you have the option to adjust
            this setting for individual reviews once they are completed.
          </AlertDescription>
          <div className="flex items-center space-x-2">
            <Switch id="isVisibleToEmployee" name="isVisibleToEmployee" />
            <input type="checkbox" name="isVisibleToEmployee" />

            <Label htmlFor="isVisibleToEmployee">Make review visible</Label>
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
