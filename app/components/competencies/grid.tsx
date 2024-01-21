import { Competency } from "@prisma/client";
import { AgGridReact } from "ag-grid-react";

export interface CompetenciesGridProps {
  competencies: Competency[];
}

export default function CompetenciesGrid({
  competencies,
}: CompetenciesGridProps): JSX.Element {
  const columns = [
    {
      field: "name",
      headerName: "Competency Name",
      sortable: true,
      filter: true,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: true,
      filter: true,
      flex: 1,
    },
  ] as any;

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
      <AgGridReact columnDefs={columns} rowData={competencies} />
    </div>
  );
}
