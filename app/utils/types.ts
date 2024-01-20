import { Competency, Department, Review, User } from "@prisma/client";

export type NavigationItem = {
  name: string;
  href: string;
  submenu?: NavigationItem[];
};

export interface ManagedEmployee extends User {
  reviews: Review[];
}
export interface DepartmentTest extends Department {
  competencies: Competency[];
}
