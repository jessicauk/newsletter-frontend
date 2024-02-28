import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "../select";
import InputFileUpload from "../input-file";
import { getAllRecipients } from "../../app/http-client";
import useFileUpload from "../../app/hooks/useFileUpload";
import useSendEmail from "../../app/hooks/useSendEmail";

interface Recipient {
  name: string;
  email: string;
  isSubscribed: boolean;
}

export default function Form() {
  const fetchRef = useRef(false);
  const jsonData = useRef("");
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const { handleFilesChange, setFiles, formData, files } = useFileUpload();
  const { response, isLoading } = useSendEmail({
    formData,
    jsonData: jsonData.current,
    sent,
  });

  useEffect(() => {
    const getRecipients = async () => {
      fetchRef.current = true;
      const data = await getAllRecipients();
      fetchRef.current = false;
      setRecipients(data);
    };
    if (fetchRef.current === false) {
      getRecipients();
    }
  }, []);

  useEffect(() => {
    if (response) {
      setSent(false);
      setSelected([]);
      setFiles([]);
    }
  }, [response]);

  const recipientsSelected = useMemo(() => {
    if (recipients === undefined) return [];
    return recipients
      .filter((recipient) => selected.includes(recipient.name))
      .map((recipient) => ({
        name: recipient.name,
        address: recipient.email,
      }));
  }, [selected, recipients]);

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
    },
    [recipientsSelected, formData, jsonData]
  );

  return (
    <form
      className="w-full h-5/6 flex flex-col justify-evenly grow shrink p-1 content-center items-center"
      onSubmit={onSubmit}
    >
      <FormControl className="w-full">
        <Select<Recipient>
          name="recipient"
          required
          data={recipients}
          selected={selected}
          setSelected={setSelected}
        />
      </FormControl>
      <FormControl className="w-full">
        <InputFileUpload files={files} handleFilesChange={handleFilesChange} />
      </FormControl>
      <FormControl className="w-full">
        <Button
          disabled={isLoading || recipientsSelected.length === 0}
          className="bg-indigo-500 hover:bg-indigo-700"
          type="submit"
          variant="contained"
        >
          Send Email
        </Button>
      </FormControl>
    </form>
  );
}
