import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import styles from "./input.module.scss";
import { parseISO } from "date-fns";

export function InputComponent(props: any) {
  const { field, fieldState } = useController(props);
  const { trigger, setValue } = useFormContext();

  const checkFieldValidity = async () => {
    if (field.value !== "") {
      const result = await trigger(field.name);
      return result;
    }
  };

  return (
    <TextField
      {...field}
      id={field.name}
      label={props.displayName}
      variant="filled"
      inputRef={field.ref}
      error={!!fieldState.error}
      helperText={fieldState.error ? props.helperText : ""}
      required={true}
      onChangeCapture={() => checkFieldValidity()}
      onChange={(e) => {
        setValue(field.name, e.target.value);
      }}
    />
  );
}

export function RadioInputComponent(props: any) {
  const {
    setError,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const listenToRadio = watch(`${field.name}`);

  const setRadioError = () => {
    setError(field.name, { type: "required", message: "this is required" });
  };

  const checkFieldValidity = async () => {
    const legitFields = await trigger(field.name);
    if (field.value !== "" || legitFields) {
      clearErrors(field.name);
      return;
    }
    setRadioError();
  };

  return (
    <>
      <FormControl
        error={listenToRadio === "" && error !== undefined}
        required={true}
      >
        <FormLabel className={styles.formLabel} id={field.name}>
          {props.radioDetails.title}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          {...field}
          id={field.name}
          defaultValue={""}
          onChangeCapture={() => checkFieldValidity()}
        >
          {...props.radioDetails.options.map(({ name }: any) => (
            <FormControlLabel
              {...field}
              key={`${props.radioDetails.title}_${name}`}
              value={name}
              control={<Radio />}
              label={name}
              required={true}
              id={name}
              inputRef={field.ref}
              defaultValue={name}
            />
          ))}
        </RadioGroup>
        {errors?.[field.name]?.message && (
          <FormHelperText>{props.displayName} is required</FormHelperText>
        )}
      </FormControl>
    </>
  );
}

export function DateInputComponent(props: any) {
  const { field } = useController(props);
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div style={{ height: "fitContent" }}>
      <DatePicker
        {...field}
        onChange={field.onChange}
        value={parseISO(field.value)}
        label="Date of Birth"
        format="dd-MM-yyyy"
      />
      {errors?.[field.name]?.message && (
        <FormHelperText>
          {errors?.[field.name]?.message?.toString()}
        </FormHelperText>
      )}
    </div>
  );
}

export function DropdownComponent(props: any) {
  const { field } = useController(props);
  return (
    <FormControl
      variant="filled"
      sx={{ m: 1, minWidth: 120, height: "fit-content" }}
      required
    >
      <InputLabel id={field.value}>Gender</InputLabel>
      <Select
        {...field}
        labelId={field.value}
        id={field.value}
        label={field.value}
        value={field.value}
        onChange={field.onChange}
        inputRef={field.ref}
        required={true}
      >
        <MenuItem value="">Select a gender</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="non-binary">Non-binary</MenuItem>
        <MenuItem value="declineToState">Decline to state</MenuItem>
        <MenuItem value="other">Prefer to self describe</MenuItem>
      </Select>
    </FormControl>
  );
}
