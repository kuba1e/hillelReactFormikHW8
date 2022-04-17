import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

export const Input = ({ name, placeholder, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      name={name}
      value={field.value}
      onChange={field.onChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      placeholder={placeholder}
      inputProps={{
        onBlur: field.onBlur,
      }}
      margin="dense"
    />
  );
};
