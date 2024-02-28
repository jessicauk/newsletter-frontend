import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { REG_EXP_EMAIL } from "../../app/utils/const";
import { createRecipient } from "../../app/http-client/index";

interface FormInput {
  email: string;
  name: string;
}

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const response = await createRecipient(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={2}>
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
      <Box marginBottom={2}>
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
      <Box>
        <Button>Cancel</Button>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
}
