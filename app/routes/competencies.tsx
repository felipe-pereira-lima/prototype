import { Department } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import CompetenciesGrid from "~/components/competencies/grid";
import { getDepartmentsOfCompany } from "~/services/departments/get-departments-of-company.server";

import { useState, useEffect } from "react";
import { ComboBox } from "~/components/ui/combo-box";

export const loader = getDepartmentsOfCompany;

export default function Competencies() {
  const departments = useLoaderData<typeof loader>();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(
    departments[0]?.id
  );
  const [filteredCompetencies, setFilteredCompetencies] = useState([]);

  useEffect(() => {
    const selectedDepartment = departments.find(
      (department: Department) => department.id === selectedDepartmentId
    );
    setFilteredCompetencies(selectedDepartment?.competencies || []);
  }, [selectedDepartmentId, departments]);

  return (
    <div>
      <ComboBox
        options={departments.map((department: Department) => ({
          value: department.id.toString(),
          label: department.name,
        }))}
        onSelect={(value: string) => setSelectedDepartmentId(parseInt(value))}
        selectedValue={selectedDepartmentId.toString()}
        placeholder="Select a department"
      />
      <div className="mt-4">
        <CompetenciesGrid competencies={filteredCompetencies} />
      </div>
    </div>
  );
}
