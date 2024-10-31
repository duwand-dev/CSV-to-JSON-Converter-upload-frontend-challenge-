import { useState, useMemo } from "react";
import {
  Button,
  Paper,
  Title,
} from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import Papa from 'papaparse';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UploadFile from "~/components/UploadFile";
import { useNavigate } from "react-router-dom";

interface GridData {
  [key: string]: any;
}

export default function UploadPage() {
  const [gridData, setGridData] = useState<GridData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const navigate = useNavigate();

  const processCSVFile = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          // Generate column definitions from headers
          const headers = results.data[0] as string[];
          const cols: ColDef[] = [
            {
              headerName: "Select",
              field: "selected",
              checkboxSelection: true,
              headerCheckboxSelection: true,
              width: 50,
              pinned: 'left'
            },
            ...headers.map((header) => ({
              field: header,
              headerName: header,
              sortable: true,
              filter: true,
              resizable: true,
              // Special formatting for amount fields
              ...(header.toLowerCase().includes('amount') && {
                valueFormatter: (params: any) =>
                  params.value ? `$${Number(params.value).toFixed(2)}` : '',
              }),
              // Special formatting for status fields
              ...(header.toLowerCase().includes('status') && {
                cellRenderer: (params: any) => (
                  <div
                    className={`px-2 py-1 rounded-full text-sm text-center
                    ${params.value?.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : params.value?.toLowerCase() === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    {params.value}
                  </div>
                ),
              }),
            })),
          ];
          setColumnDefs(cols);

          // Process data rows
          const dataRows = results.data.slice(1) as string[][];
          const formattedData = dataRows
            .filter(row => row.some(cell => cell.trim())) // Filter out empty rows
            .map(row => {
              const rowData: GridData = {};
              headers.forEach((header, index) => {
                rowData[header] = row[index]?.trim() || '';
              });
              return rowData;
            });

          setGridData(formattedData);
        }
      },
      error: (error) => {
        alert(`Error parsing CSV: ${error.message}`);
      },
      header: false, // We'll handle headers manually
      skipEmptyLines: true,
    });
  };

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  const setFile = (file: File) => {
    processCSVFile(file)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Paper className="p-6 space-y-6 relative" shadow="sm" radius="md">
        <UploadFile setFile={setFile} />

        {gridData.length > 0 && (
          <div className="mt-8">
            <Title order={3} className="mb-4">
              Claims Preview
            </Title>
            <div className="ag-theme-alpine h-[600px] w-full rounded-lg overflow-hidden">
              <AgGridReact
                rowData={gridData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
                rowSelection="multiple"
                animateRows={true}
              />
            </div>
          </div>
        )}
        <Button onClick={() => navigate('/rmffiles')}>Show files</Button>
      </Paper>
    </div>
  );
}