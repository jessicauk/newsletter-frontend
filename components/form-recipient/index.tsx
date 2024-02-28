import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { REG_EXP_EMAIL } from "../../app/utils/const";
import { createRecipient } from "../../app/http-client/index";
import { SnackbarAlert } from "../snackbar";
import useSnakbarAlert from "../../app/hooks/useSnackbar";

interface FormInput {
  email: string;
  name: string;
}

export default function UserForm() {
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
    const response = await createRecipient(data);
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
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="box-border w-full flex flex-col justify-evenly items-center content-center w-full h-full"
    >
      {!isSubmitting && (
        <Box className="w-full flex flex-col justify-between items-center justify-self-center self-center">
          <Box marginBottom={2} className="w-3/4">
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
          <Box marginBottom={2} className="w-3/4">
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
      <Box className="w-3/4 flex flex-row wrap justify-evenly">
        <Button onClick={onClick}>Cancel</Button>
        <Button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !isValid}
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
