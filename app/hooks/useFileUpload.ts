import { useState, useMemo, useCallback } from "react";
import fileValidate from "../utils/file-validation";

export default function useFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState(false);

  const handleFilesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = e.target.files ? Array.from(e.target.files) : [];

    // validate all files
    const allFilesValid = filesArray.every((file) => fileValidate(file));

    if (allFilesValid) {
      setFiles(filesArray);
      setFileError(false);
    } else {
      setFiles([]);
      setFileError(true);
    }
  }, []);

  const formDataFiles = useMemo(() => {
    const formData = new FormData();
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }
    return formData;
  }, [files]);

  return {
    handleFilesChange,
    formData: formDataFiles,
    files,
    setFiles,
    fileError,
  };
}
