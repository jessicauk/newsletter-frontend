import { useState, useMemo } from "react";

export default function useFileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files ? Array.from(e.target.files) : []);
  };

  const formDataFiles = useMemo(() => {
    const formData = new FormData();
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }
    return formData;
  }, [files]);

  return { handleFilesChange, formData: formDataFiles, files, setFiles };
}
