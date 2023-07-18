import React from "react";
import { useController } from "react-hook-form";
import { InputLabel, TextField } from "@material-ui/core";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export function InputComponent(props: any) {
  const { field, fieldState } = useController(props);
  return (
    <div>
      <TextField
        id={field.name}
        label={field.name}
        variant="filled"
        {...field}
        placeholder={props.name}
        inputRef={field.ref}
        helperText="useful help text"
      />
      <p>
        {fieldState.error && fieldState.isDirty
          ? "Please check the info provided here"
          : ""}
      </p>
    </div>
  );
}

export function RadioInputComponent(props: any) {
  const { field, fieldState } = useController(props);
  return (
    <>
      <FormControl>
        <FormLabel id={field.name}>
          {props.props.title}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          {...field}
        >
          {...props.props.options.map(({ name, id }: any) => (
            <FormControlLabel
              key={name}
              value={name}
              control={<Radio />}
              label={name}
              id={id}
              inputRef={field.ref}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <p>
        {fieldState.error && fieldState.isDirty
          ? "Please check the info provided here"
          : ""}
      </p>
    </>
  );
}

export function DateInputComponent(props: any) {
  const { field } = useController(props);
  return (
    <div style={{ height: "fitContent" }}>
      <DatePicker
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
    >
      <InputLabel id={field.value}>Gender</InputLabel>
      <Select
        {...field}
        labelId={field.value}
        id={field.value}
        value={field.value}
        onChange={field.onChange}
        inputRef={field.ref}
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
