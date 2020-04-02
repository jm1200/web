import React from "react";
import { useField, FieldAttributes } from "formik";
import { TextField } from "@material-ui/core";

type IMyTextFieldProps = {
  type?: string;
} & FieldAttributes<{}>;

export const MyTextField: React.FC<IMyTextFieldProps> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{ type?: string }>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  console.log("MyTextField: props", props, field, meta);
  return (
    //@ts-ignore
    <TextField
      placeholder={placeholder}
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
