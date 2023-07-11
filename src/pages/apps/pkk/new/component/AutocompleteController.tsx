import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function AutocompleteController(props: {
  name: string;
  data: any;
  setData?: any;
  label: string;
  placeHolder: string;
  control: any;
  errors: any;
  errMessage?: string;
}) {
  const {
    name,
    data,
    setData,
    label,
    placeHolder,
    control,
    errors,
    errMessage = "This field is required",
  } = props;

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => {
          // Find the corresponding vessel object from Data
          const selectedData = data.find((item) => {
            return item.id === value;
          });

          return (
            <Autocomplete
              options={data}
              id="autocomplete-outlined"
              getOptionLabel={(data) => data.id + " - " + data.label || ""}
              value={selectedData || null} // Set the selected data as the value
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              onChange={(event, newValue) => {
                if (setData) {
                  setData(newValue.id);
                }

                // Update the value in the form state
                onChange(newValue?.id || "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{ shrink: true }}
                  label={label}
                  placeholder={placeHolder}
                  error={Boolean(errors[name])}
                />
              )}
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
