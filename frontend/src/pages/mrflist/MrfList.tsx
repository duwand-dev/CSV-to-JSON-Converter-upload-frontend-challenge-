import { useEffect, useState, useMemo } from 'react';
import {
  Paper,
  Title,
  Text,
  Notification,
  LoadingOverlay,
  Button
} from '@mantine/core';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { serverURL } from '~/config';

interface MRFFile {
  name: string;
  size: number;
  created: string;
  modified: string;
}

const MrfListPage = () => {
  const [files, setFiles] = useState<MRFFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const columnDefs: ColDef[] = useMemo(() => [
    {
      field: 'name',
      headerName: 'File Name',
      sortable: true,
      filter: true,
      flex: 2,
      cellRenderer: (params: any) => (
        <a href={`${serverURL}/mrf_files/${params.value}`} target='_blank' download >
          <div className="flex items-center">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
              {params.value.slice(params.value.lastIndexOf('@') + 1, params.value.lastIndexOf('.'))}
            </span>
          </div>
        </a >
      )
    },
    {
      field: 'size',
      headerName: 'Size',
      sortable: true,
      filter: true,
      valueFormatter: params => `${(params.value / 1024).toFixed(2)} KB`
    },
    {
      field: 'created',
      headerName: 'Created Date',
      sortable: true,
      filter: true,
      valueFormatter: params => format(new Date(params.value), 'PPP pp')
    },
    {
      field: 'modified',
      headerName: 'Modified Date',
      sortable: true,
      filter: true,
      valueFormatter: params => format(new Date(params.value), 'PPP pp')
    }
  ], []);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await axios.get<MRFFile[]>('http://localhost:8080/mrf-files');
        setFiles(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Paper className="p-6 space-y-6 relative" shadow="sm" radius="md">
        <LoadingOverlay visible={loading} />

        <div className="border-b pb-4">
          <Title order={2} className="text-gray-800">MRF Files</Title>
          <Text className="text-gray-600 mt-1">
            List of all generated MRF files
          </Text>
        </div>

        {error && (
          <Notification
            color="red"
            title="Error"
            onClose={() => setError(null)}
          >
            {error}
          </Notification>
        )}

        <div className="ag-theme-alpine h-[600px] w-full rounded-lg overflow-hidden">
          <AgGridReact
            rowData={files}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={20}
            animateRows={true}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
              resizable: true,
            }}
          />
        </div>
        <Button onClick={() => navigate('/upload')}>Upload files</Button>
      </Paper>
    </div>
  );
}

export default MrfListPage;