import { AgGridReact } from "ag-grid-react";

export default function CompetenciesGrid({ competencies }) {
  const seniorityLevels = [
    "INTERN",
    "JUNIOR",
    "SENIOR",
    "MANAGER",
    "EXECUTIVE",
    "CEO",
  ];

  const transformCompetenciesForGrid = (
    competencies: any,
    seniorityLevels: any
  ) => {
    console.log("Seniority Levels:", seniorityLevels);
    return competencies.map((competency: any) => {
      const levelsMap = competency?.levels?.reduce((acc, level) => {
        acc[level.level] = level.description;
        return acc;
      }, {});

      const transformedCompetency = {
        name: competency.name,
        description: competency.description,
        ...levelsMap,
      };

      return transformedCompetency;
    });
  };

  const transformedCompetencies = transformCompetenciesForGrid(
    competencies,
    seniorityLevels
  );

  const columnDefs = [
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
    ...seniorityLevels.map((level) => ({
      field: level,
      headerName: level.charAt(0) + level.slice(1).toLowerCase(),
      wrapText: true,
      autoHeight: true,
    })),
  ];

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    columnDefs,
  };

  return (
    <div className="ag-theme-quartz" style={{ height: "70vh", width: "100%" }}>
      <AgGridReact
        gridOptions={gridOptions}
        rowData={transformedCompetencies}
      />
    </div>
  );
}
