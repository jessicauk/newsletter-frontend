import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { REG_EXP_EMAIL, REG_EXP_PHONE } from "../../app/utils/const";
import { SnackbarAlert } from "../snackbar";
import useSnakbarAlert from "../../app/hooks/useSnackbar";
import { createContact } from "../../app/http-client/contact";

interface FormInput {
  email: string;
  name: string;
  phone: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInput>();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { setMessage, setOpen, setSeverity, open, message, severity } =
    useSnakbarAlert();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsSubmitting(true);
    const response = await createContact(data);
    setMessage(response.message);
    setSeverity("success");
    setIsSubmitting(false);
    setOpen(true);
    reset();
  };

  useEffect(() => {
    if (!isSubmitting && !open) {
      setMessage("");
    }
  }, [isSubmitting, open]);

  const onClick = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="box-border w-full flex flex-col justify-evenly items-center content-center w-full h-full"
    >
      {!isSubmitting && (
        <Box className="w-full flex flex-col justify-center items-center justify-self-center self-center">
          <Box marginBottom={2} className="w-full md:w-3/4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />
          </Box>
          <Box marginBottom={2} className="w-full md:w-3/4">
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
              maxLength={10}
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: REG_EXP_PHONE,
                  message: "Invalid phone number",
                },
              })}
            />
          </Box>
          <Box marginBottom={2} className="w-full md:w-3/4">
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: REG_EXP_EMAIL,
                  message: "Invalid email address",
                },
              })}
            />
          </Box>
        </Box>
      )}
      {isSubmitting && <CircularProgress className="w-3/4" />}
      <Box className="w-full md:w-3/4 flex flex-row wrap justify-evenly">
        <Button className="text-indigo-800" onClick={onClick}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Box>
      <SnackbarAlert
        severity={severity}
        open={open}
        setOpen={setOpen}
        message={message}
      />
    </form>
  );
}
