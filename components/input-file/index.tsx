import { useEffect } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RestorePageIcon from "@mui/icons-material/RestorePage";

interface InputFileProps {
  files: File[];
  handleFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputFile({
  handleFilesChange,
  files,
}: InputFileProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFilesChange(e);
  }

  useEffect(() => {
    const output = document.getElementById("file-name");
    if (output !== null) {
      if (files.length > 0) {
        showFileName();
      } else {
        output.innerHTML = ""; // Clear the content if no files are present
      }
    }
  }, [files]);

  function showFileName() {
    const output =
      document.getElementById("file-name") ?? document.createElement("ul");
    const children = Array.from(files ?? []).map((file) => {
      return `<li class="text-indigo-800">${file?.name}</li>`;
    });
    output.innerHTML = children.join("");
  }
  return (
    <>
      <label
        htmlFor="file-upload"
        className="size-28 border-dotted m-auto text-center cursor-pointer flex flex-col justify-center content-center items-center text-indigo-500 px-4 py-2"
      >
        {files.length > 0 ? (
          <RestorePageIcon fontSize="large" />
        ) : (
          <AttachFileIcon fontSize="large" />
        )}

        <span className="m-auto text-center ml-2">
          {files.length > 0 ? "Restore Files" : "Attach Files"}
        </span>
      </label>
      <input
        id="file-upload"
        className="hidden"
        type="file"
        name="document"
        onChange={onChange}
        required
        multiple
      />
      <div
        id="file-name"
        className="overflow-auto m-auto w-5/6 h-24 mt-2 text-gray-700"
      ></div>
    </>
  );
}
