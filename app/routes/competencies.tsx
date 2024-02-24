import { Department } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import CompetenciesGrid from "~/components/competencies/grid";
import { getDepartmentsOfCompany } from "~/services/departments/get-departments-of-company.server";

import { useState, useEffect } from "react";
import { ComboBox } from "~/components/ui/combo-box";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";

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
    <div className="space-y-2">
      <CardTitle>Competences criteria</CardTitle>
      <CardDescription>
        Know more about the expected skills by department and seniority level
      </CardDescription>
      <div className="mt-4">
        <Card className="space-y-4">
          <div className="p-4">
            <div className="mb-4">
              <ComboBox
                options={departments.map((department: Department) => ({
                  value: department.id.toString(),
                  label: department.name,
                }))}
                onSelect={(value: string) =>
                  setSelectedDepartmentId(parseInt(value))
                }
                selectedValue={selectedDepartmentId.toString()}
                placeholder="Select a department"
              />
            </div>
            <CompetenciesGrid competencies={filteredCompetencies} />
          </div>
        </Card>
      </div>
    </div>
  );
}
