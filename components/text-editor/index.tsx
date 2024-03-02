import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the styles

interface TextEditorProps {
  setHtml: React.Dispatch<React.SetStateAction<string>>;
}

let Quill; // Declare Quill outside component to prevent re-imports on re-renders
export function TextEditor({ setHtml }: TextEditorProps) {
  const [quill, setQuill] = useState(null);
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html: string) => {
    setEditorHtml(html);
    setHtml && setHtml(html);
  };

  useEffect(() => {
    const editor = document.getElementById("editor");

    if (
      typeof window !== "undefined" &&
      quill === null &&
      editor?.hasChildNodes() === false
    ) {
      Quill = require("quill");
      setQuill(
        new Quill("#editor", {
          theme: "snow",
          placeholder: "Write something...",
          onChange: handleChange,
        })
      );
    }
  }, [quill]);

  return <div id="editor" className="w-full" />;
}

export default TextEditor;
