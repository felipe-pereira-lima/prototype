import { Competency } from "@prisma/client";
import { AgGridReact } from "ag-grid-react";

export interface CompetenciesGridProps {
  competencies: Competency[];
}

export default function CompetenciesGrid({
  competencies,
}: CompetenciesGridProps): JSX.Element {
  const gridOptions = {
    defaultColDef: {
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    columnDefs: [
      {
        field: "name",
        headerName: "Competency Name",
        wrapText: true,
        autoHeight: true,
      },
      {
        field: "description",
        headerName: "Description",
        wrapText: true,
        autoHeight: true,
      },
    ] as any,
  };

  return (
    <div className="ag-theme-quartz" style={{ height: "80vh", width: "100%" }}>
      <AgGridReact
        gridOptions={gridOptions}
        columnDefs={gridOptions.columnDefs}
        rowData={competencies}
      />
    </div>
  );
}
