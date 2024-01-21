// app/routes/competencies.tsx
import { Competency, Department } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import CompetenciesGrid from "~/components/competencies/grid";
import { ComboBox } from "~/components/ui/combo-box";
import { getDepartmentsOfCompany } from "~/services/departments/get-departments-of-company.server";
import { DepartmentTest } from "~/utils/types";
import { LinksFunction } from "@remix-run/node";

// Import the CSS files for ag-Grid
import agGridCSS from "ag-grid-community/styles/ag-grid.css";
import agThemeAlpineCSS from "ag-grid-community/styles/ag-theme-alpine.css";
import { useState } from "react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: agGridCSS },
    { rel: "stylesheet", href: agThemeAlpineCSS },
    // Add other themes as needed
  ];
};

export const loader = getDepartmentsOfCompany;

export default function Competencies() {
  const departments = useLoaderData<typeof loader>();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(
    departments[0]?.id
  );

  console.log("deede", departments[0]);

  console.log(departments);

  const filteredCompetencies = selectedDepartmentId
    ? departments.find(
        (department: Department) => department.id === selectedDepartmentId
      )?.competencies || []
    : [];

  const selectedDepartment = departments.find(
    (department: Department) => department.id === selectedDepartmentId
  );

  return (
    <div>
      <ComboBox
        options={departments.map((department: Department) => ({
          id: department.id,
          label: department.name,
        }))}
        valueKey={(option: any) => option.id}
        valueLabel={(option) => option.label}
        onSelection={(newValue) => {
          setSelectedDepartmentId(newValue ? newValue.id : undefined);
          console.log(newValue);
        }}
        placeholder="Select a department"
        initialValue={
          selectedDepartment
            ? { id: selectedDepartment.id, label: selectedDepartment.name }
            : null
        }
      />
      <div className="mt-4">
        <CompetenciesGrid competencies={filteredCompetencies} />
      </div>
    </div>
  );
}
