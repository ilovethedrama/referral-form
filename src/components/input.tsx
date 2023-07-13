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
  const { field } = useController(props);
  return (
    <div>
      <TextField
        id="filled-basic"
        label={field.name}
        variant="filled"
        {...field}
        placeholder={props.name}
      />
    </div>
  );
}

export function RadioInputComponent(props: any) {
  const { field } = useController(props);
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
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
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export function DateInputComponent(props: any) {
  const { field } = useController(props);
  return (
    <DatePicker
      onChange={field.onChange}
      value={new Date(field.value)}
      label="Date of Birth"
    />
  );
}

export function DropdownComponent(props: any) {
  const { field } = useController(props);
  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
      <Select
        {...field}
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={field.value}
        onChange={field.onChange}
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
