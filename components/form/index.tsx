import { useEffect, useState, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "../select";
import InputFile from "../input-file";
import { getAllRecipients } from "../../app/http-client";

export default function Form() {
  const [recipients, setRecipients] = useState([]);
  const fetchRef = useRef(false);

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
  return (
    <form
      className="flex flex-col justify-evenly h-3/5 p-1 content-center items-center"
      action="/send-email"
      method="post"
      encType="multipart/form-data"
    >
      <FormControl className="w-full">
        <Select<any> name="recipient" required data={recipients} />
      </FormControl>
      <FormControl className="w-full">
        <InputFile />
      </FormControl>
      <FormControl className="w-full">
        <Button className="bg-indigo-500" type="submit" variant="contained">
          Send Email
        </Button>
      </FormControl>
    </form>
  );
}
