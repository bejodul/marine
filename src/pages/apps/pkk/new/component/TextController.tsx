import { FormControl, FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function TextController(props: {
  name: string;
  label: string;
  placeHolder: string;
  control: any;
  errors: any;
  errMessage?: string;
}) {
  const {
    control,
    name,
    label,
    placeHolder,
    errors,
    errMessage = "This field is required",
  } = props;

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={() => {
          return (
            <TextField
              label={label}
              placeholder={placeHolder}
              error={Boolean(errors[name])}
              InputLabelProps={{ shrink: true }}
            />
          );
        }}
      />
      {errors[name] && (
        <FormHelperText
          sx={{ color: "error.main" }}
          id="validation-basic-first-name"
        >
          {errMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
