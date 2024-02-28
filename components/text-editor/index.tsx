import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

interface TextEditorProps {
  setHtml: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor = ({ setHtml }: TextEditorProps) => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html: string) => {
    setEditorHtml(html);
    setHtml && setHtml(html);
  };

  return (
    <div className="">
      <ReactQuill value={editorHtml} onChange={handleChange} />
    </div>
  );
};

export default TextEditor;
