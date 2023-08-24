import React, { useState, useEffect } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
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
import ctx from "../app/ReferralFormContext";

export function InputComponent(props: any) {
  const { field, fieldState } = useController(props);
  const {
    trigger
  } = useFormContext();

  const reValidate = async () => {
    if (field.value !== "") {
      const result = await trigger(field.name);
      return result;
    }
  };

  return (
    <div>
      <TextField
        {...field}
        id={field.name}
        label={field.name}
        variant="filled"
        inputRef={field.ref}
        error={!!fieldState.error}
        helperText={fieldState.error ? props.helperText : ""}
        required={true}
        onChangeCapture={reValidate}
      />
    </div>
  );
}

export function RadioInputComponent(props: any) {
  const { radioIsValid } = React.useContext(ctx);
  const [isOk, setIsOk] = useState(false);
  const {
    setError,
    trigger,
    formState: { errors },
  } = useFormContext();
  const { field } = useController(props);

  const reValidate = async (e: any) => {
    console.log("doof");
    if (e.target.value) {
      checkFieldValidity();
    }
  };

  const setRadioError = () => {
    setError(field.name, { type: "required", message: "this is required" });
    setIsOk(true);
  };

  const checkFieldValidity = async () => {
    console.log("diff");
    const legitFields = await trigger();
    if (field.value === "" || legitFields) {
      setRadioError();
      return;
    }
    console.log(legitFields, field.value);
  };

  useEffect(() => {
    checkFieldValidity();
  }, [radioIsValid]);

  return (
    <>
      <FormControl error={isOk} required={true}>
        <FormLabel className={styles.formLabel} id={field.name}>
          {props.radioDetails.title}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          {...field}
          id={field.name}
          onChangeCapture={(e) => reValidate(e)}
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
          <FormHelperText>
            Here be errors {errors?.[field.name]?.message?.toString()}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
}

export function DateInputComponent(props: any) {
  const { field } = useController(props);
  return (
    <div style={{ height: "fitContent" }}>
      <DatePicker
        {...field}
        onChange={field.onChange}
        value={new Date(field.value)}
        label="Date of Birth"
        inputRef={field.ref}
      />
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
        value={field.value}
        onChange={field.onChange}
        inputRef={field.ref}
        required={true}
      >
        <MenuItem value="Select a gender">Select a gender</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="non-binary">Non-binary</MenuItem>
        <MenuItem value="declineToState">Decline to state</MenuItem>
        <MenuItem value="other">Prefer to self describe</MenuItem>
      </Select>
    </FormControl>
  );
}
