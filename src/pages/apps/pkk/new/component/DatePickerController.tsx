import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import CustomInput from "../component/PickersComponent";
import { FormHelperText } from "@mui/material";

export default function DatePickerController(props: {
  name: string;
  format: string;
  placeHolder: string;
  control: any;
  errors: any;
  errMessage?: string;
  minDate?: Date;
  maxDate?: Date;
  id: string;
  setValue: any;
  popperPlacement: any;
  label: string;
  showTimeSelect?: boolean;
}) {
  const {
    control,
    name,
    format,
    placeHolder,
    errors,
    errMessage = "This field is required",
    minDate,
    maxDate,
    id,
    setValue,
    popperPlacement,
    label,
    showTimeSelect = false,
  } = props;

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <DatePickerWrapper>
            <DatePicker
              showTimeSelect={showTimeSelect}
              timeFormat="HH:mm"
              timeIntervals={10}
              selected={value}
              dateFormat={format}
              id={id}
              onChange={(dateFormat: Date) => {
                setValue(dateFormat);
                onChange(dateFormat);
              }}
              popperPlacement={popperPlacement}
              placeholderText={placeHolder}
              minDate={minDate}
              maxDate={maxDate}
              customInput={
                <CustomInput
                  value={value}
                  onChange={onChange}
                  label={label}
                  error={Boolean(errors[name])}
                />
              }
            />
          </DatePickerWrapper>
        )}
      />
      {errors[name] && (
        <FormHelperText sx={{ mx: 3.5, color: "error.main" }}>
          {errMessage}
        </FormHelperText>
      )}
    </>
  );
}
