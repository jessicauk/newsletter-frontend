import { useState } from "react";
export default function useSnakbarAlert() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const handleClick = () => {
    setOpen(true);
  };

  return { open, message, severity, setOpen, setMessage, setSeverity, handleClick };
}