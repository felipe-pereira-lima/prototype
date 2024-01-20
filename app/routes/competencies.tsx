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

  console.log(departments);

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
          // setSelectedDepartmentId(newValue ? newValue.id : undefined);
          console.log(newValue);
        }}
        placeholder="Select a department"
      />
      <div className="mt-4">
        <CompetenciesGrid
          competencies={departments.map((department: any) =>
            department.competencies.map((competency: any) => competency)
          )}
        />
      </div>
    </div>
  );
}
