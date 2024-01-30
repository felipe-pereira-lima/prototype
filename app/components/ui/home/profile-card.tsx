import { Button } from "../button";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Label } from "../label";
import { Input } from "../input";
import { useState } from "react";

export interface ProfileCardProps {
  data: any;
}
export default function ProfileCard({ data }: ProfileCardProps): JSX.Element {
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSave = () => {};

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Profile</CardTitle>
            <Button size={"icon"} onClick={handleOpen}>
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardDescription className="pl-6">
          You can edit some of your data
        </CardDescription>
      </Card>

      {isOpen && (
        <Dialog open={isOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={data.fullName} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={data.username}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  value={data.password}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Confirm password
                </Label>
                <Input
                  id="password"
                  value={data.password}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
