import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "../select";
import InputFileUpload from "../input-file";
import { getAllRecipients } from "../../app/http-client";
import useFileUpload from "../../app/hooks/useFileUpload";
import useSendEmail from "../../app/hooks/useSendEmail";
import { SnackbarAlert } from "../snackbar";
import {
  MESSAGE_DOCUMENT,
  MESSAGE_EMAIL,
  MESSAGE_UNSUPPORTED_FILE,
} from "../../app/utils/const";
import useSnakbarAlert from "../../app/hooks/useSnackbar";

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
  const { setMessage, setOpen, open, message, severity } = useSnakbarAlert();

  const { handleFilesChange, setFiles, formData, files, fileError } =
    useFileUpload();

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

  const handleClick = () => {
    setMessage(MESSAGE_EMAIL);
    setOpen(true);
  };

  useEffect(() => {
    if (response) {
      handleClick();
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

      if (files.length == 0) {
        setOpen(true);
        setMessage(MESSAGE_DOCUMENT);
        return;
      }

      jsonData.current = JSON.stringify({
        to: recipientsSelected,
        subject: `Newsletter ${new Date().toLocaleDateString()}`,
        html: "<div><h1>Newsletter</h1><div>",
      });
      formData.append("data", jsonData.current);
      setSent(true);
    },
    [recipientsSelected, formData, jsonData, files]
  );

  const onCancel = useCallback(() => {
    setSelected([]);
    setFiles([]);
  }, []);

  return (
    <form
      className="box-border w-full h-5/6 flex flex-col justify-evenly grow shrink p-1 content-center items-center"
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
        {isLoading ? (
          <div className="w-full h-24 flex justify-center items-center content-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col justify-center content-center items-center">
            {fileError && (
              <div className="error text-red-800 m-4">
                {MESSAGE_UNSUPPORTED_FILE}
              </div>
            )}
            <InputFileUpload
              files={files}
              handleFilesChange={handleFilesChange}
            />
          </div>
        )}
      </FormControl>
      <FormControl className="w-full flex flex-row wrap">
        <Button
          disabled={isLoading || recipientsSelected.length === 0}
          className="w-1/2"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading || recipientsSelected.length === 0}
          className="w-1/2 bg-indigo-500 hover:bg-indigo-700"
          type="submit"
          variant="contained"
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </FormControl>
      <SnackbarAlert
        severity={severity}
        open={open}
        setOpen={setOpen}
        message={message}
      />
    </form>
  );
}
