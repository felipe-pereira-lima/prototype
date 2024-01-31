import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bell, BracketsSquare, X } from "phosphor-react";
import { Form } from "@remix-run/react";
import { Button } from "./ui/button";
import { useUser } from "~/context/user-context";
import Avatar from "./ui/avatar";

export default function Navbar(): JSX.Element {
  const user = useUser();

  console.log(user);
  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-end">
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BracketsSquare
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="relative flex rounded-full items-center gap-x-2 text-sm text-black focus:outline-none">
                        <Avatar string={user?.fullName} />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true">{user?.fullName}</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute text-right right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none">
                        <Menu.Item>
                          <Form method="post">
                            <Button type="submit" variant="link">
                              Logout
                            </Button>
                          </Form>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
