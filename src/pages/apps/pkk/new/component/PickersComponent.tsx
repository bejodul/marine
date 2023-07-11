import { TextField } from "@mui/material";
import { ChangeEvent, forwardRef } from "react";
import { DateType } from "src/types/forms/reactDatepickerTypes";

interface CustomInputProps {
  value: DateType;
  label: string;
  error: boolean;
  onChange: (event: ChangeEvent) => void;
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: "100%" }} />;
});

export default CustomInput;
