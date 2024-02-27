import { Dispatch, SetStateAction, useCallback } from "react";
interface Submit {
  recipientsSelected: { name: string; address: string }[];
  formData: FormData;
  jsonData: { current: string };
  setSent: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<string[]>>;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export default function useSubmit({
  recipientsSelected,
  formData,
  jsonData,
  setSent,
  setSelected,
  setFiles,
}: Submit) {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      jsonData.current = JSON.stringify({
        to: recipientsSelected,
        subject: `Newsletter ${new Date().toLocaleDateString()}`,
        html: "<div><h1>Newsletter</h1><div>",
      });
      formData.append("data", jsonData.current);
      setSent(true);
      setSelected([]);
      setFiles([]);
    },
    [recipientsSelected, formData, jsonData]
  );
  return { onSubmit };
}
