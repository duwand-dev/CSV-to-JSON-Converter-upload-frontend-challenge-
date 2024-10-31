import { useState, useCallback, FC } from "react";
import {
  Paper,
  Text,
  Group,
  Notification,
  Title,
  Progress,
  ActionIcon,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconX,
  IconFileSpreadsheet,
} from "@tabler/icons-react";
import { Dropzone, FileRejection } from "@mantine/dropzone";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { serverURL } from "~/config";

interface UploadResponse {
  success: boolean;
  filename: string;
}

interface UploadFileProps {
  setFile: (file: File) => void
}

const UploadFile: FC<UploadFileProps> = ({ setFile }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrop = useCallback(async (files: File[]) => {
    setError(null);
    setLoading(true);
    setSelectedFile(files[0]);
    setFile(files[0])

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      await axios.post<UploadResponse>(
        `${serverURL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error uploading file");
    } finally {
      setLoading(false);
    }
  }, []);

  const onFileReject = (files: FileRejection[]) => {
    setError("Please upload a valid CSV file");
  };

  return (
    <div>
      <LoadingOverlay visible={loading} />

      <div className="border-b pb-4">
        <Title order={2} className="text-gray-800">
          Claims Upload
        </Title>
        <Text className="text-gray-600 mt-1">
          Upload your claims CSV file for processing
        </Text>
      </div>

      <Dropzone
        onDrop={handleDrop}
        onReject={onFileReject}
        maxSize={5 * 1024 ** 2}
        accept={["text/csv"]}
        className="border-2 border-dashed rounded-lg p-8 hover:border-blue-500 transition-colors"
      >
        <Group>
          <IconFileSpreadsheet size={48} className="text-gray-500" />
          <div>
            <Text size="xl" className="font-medium">
              Drag & drop your CSV file here
            </Text>
            <Text size="sm" color="dimmed" className="mt-1">
              Attach your claims file. Maximum file size is 5MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {selectedFile && (
        <Paper className="p-4 bg-gray-50" radius="md">
          <Group>
            <Group>
              <IconFileSpreadsheet size={24} className="text-blue-500" />
              <div>
                <Text size="sm">{selectedFile.name}</Text>
                <Text size="xs" color="dimmed">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </Text>
              </div>
            </Group>
            <ActionIcon
              color="red"
              onClick={() => {
                setSelectedFile(null);
                setFile(null)
              }}
              variant="light"
            >
              <IconX size={18} />
            </ActionIcon>
          </Group>
          {loading && (
            <Progress
              value={uploadProgress}
              className="mt-3"
              size="sm"
              color="blue"
            />
          )}
        </Paper>
      )}

      {error && (
        <Notification
          color="red"
          title="Error"
          onClose={() => setError(null)}
        >
          {error}
        </Notification>
      )}
    </div>
  );
}

export default UploadFile