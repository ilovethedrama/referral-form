import React, { useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Button, Checkbox, FormGroup, TextField } from "@material-ui/core";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, FormHelperText } from "@mui/material";
import styles from "./input.module.scss";
import { format, parseISO, sub } from "date-fns";
import { DropDownLabel } from "@/types/formTypes";
import SignaturePad from "react-signature-pad-wrapper";
import Image from "next/image";

export function InputComponent(props: any) {
  const { field, fieldState } = useController(props);
  const { trigger, clearErrors } = useFormContext();

  const checkFieldValidity = async () => {
    const legitFields = await trigger(field.name);
    if (field.value !== "" || legitFields) {
      clearErrors(field.name);
      return;
    }
  };

  return (
    <TextField
      sx={{ width: "100%" }}
      {...field}
      id={field.name}
      label={props.displayName}
      variant="filled"
      inputRef={field.ref}
      error={!!fieldState.error}
      helperText={fieldState.error ? props.helperText : ""}
      required={true}
      onChangeCapture={() => checkFieldValidity()}
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
    <FormControl
      className={styles.radioGroupContainer}
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
      {errors?.[field.name]?.message && !field.value && (
        <FormHelperText>{props.displayName} is required</FormHelperText>
      )}
    </FormControl>
  );
}

export function DateInputComponent(props: any) {
  const { field } = useController(props);
  const {
    formState: { errors },
    trigger,
    clearErrors,
    setValue,
  } = useFormContext();

  const checkFieldValidity = async (value: Date | null) => {
    setValue(props.name, value);

    const legitFields = await trigger(field.name);
    if (field.value || legitFields) {
      clearErrors(field.name);
      return;
    }
  };

  const elevenYearsAgoFromToday = sub(new Date(), {
    years: 11,
  });
  console.log(field.value);
  return (
    <div style={{ height: "fitContent" }} className={styles.container}>
      <DatePicker
        {...field}
        onChange={(value, otherstuff) => {
          setValue(props.name, value);
          checkFieldValidity(value);
        }}
        value={parseISO(new Date().toDateString())}
        defaultValue={parseISO("2022-09-17")}
        label="Date of Birth"
        format="dd-MM-yyyy"
        maxDate={elevenYearsAgoFromToday}
      />
      {errors?.[field.name]?.message && !field.value ? (
        <FormHelperText error>{props.helperText}</FormHelperText>
      ) : (
        <FormHelperText>
          Referral must be at least 11 years old in age
        </FormHelperText>
      )}
    </div>
  );
}

export function DropdownComponent(props: any) {
  const { field } = useController(props);
  const {
    formState: { errors },
    setValue,
    trigger,
    clearErrors,
  } = useFormContext();

  const checkFieldValidity = async () => {
    const legitFields = await trigger(field.name);
    if (field.value !== "" || legitFields) {
      clearErrors(field.name);
      return;
    }
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={props.dropdownDetails.options.map(
          (option: DropDownLabel) => option.label
        )}
        onInputChange={(_, newPetInputValue) => {
          checkFieldValidity();
          setValue(props.name, newPetInputValue);
        }}
        isOptionEqualToValue={(option: any, value) => {
          return option.toString() === value.toString();
        }}
        renderOption={(props, option: any) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
        getOptionLabel={(option) => option.label ?? option}
        renderInput={(params) => <TextField {...params} label="Gender" />}
      />
      {errors?.[field.name]?.message && !field.value && (
        <FormHelperText error>{props.displayName} is required</FormHelperText>
      )}
    </div>
  );
}

export function CheckboxComponent(props: any) {
  const { field } = useController(props);
  const { setValue } = useFormContext();

  const [marketingList, setMarketingList] = React.useState<Array<string>>([]);

  const gimiTheLight = (e: any) => {
    if (e.target.checked) {
      console.log("item added is ", e.target.labels[0].textContent);
      setMarketingList([e.target.labels[0].textContent, ...marketingList]);
      setValue(field.name, [e.target.labels[0].textContent, ...marketingList]);
      return;
    }
    if (e.target.checked === false) {
      const newArray = marketingList.filter(
        (item) => item !== e.target.labels[0].textContent
      );
      setMarketingList(newArray);
      setValue(field.name, newArray);
      return;
    }
  };

  return (
    <FormControl sx={{ maxWidth: 600, width: "100%" }}>
      <FormLabel className={styles.formLabel} id={field.name}>
        {props.checkboxDetails.title}
      </FormLabel>
      <FormGroup sx={{ flexFlow: "row" }}>
        {...props.checkboxDetails.options.map(({ name }: any) => (
          <FormControlLabel
            key={name}
            control={<Checkbox onChange={gimiTheLight} />}
            label={name}
            value={marketingList}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export function FormSignaturePad(props: any) {
  const { field, fieldState } = useController(props);
  const {
    setValue,
    trigger,
    clearErrors,
    setError,
    formState: { errors },
    resetField,
  } = useFormContext();
  const signaturePadRef = useRef<SignaturePad | null>(null);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
    resetField(field.name);
    console.log(field.value);
  };

  const saveSignature = () => {
    checkFieldValidity();
    if (signaturePadRef.current) {
      const signatureDataUrl = signaturePadRef.current.toDataURL(
        "image/jpeg",
        1.0
      );
      // You can now send the signatureDataUrl to your server or use it as needed.
      setValue(field.name, signatureDataUrl, { shouldDirty: true });
    }
  };
  const checkFieldValidity = async () => {
    console.log("called!");
    const legitFields = await trigger(field.name);
    console.log("legitFields?! :", legitFields);
    console.log("field.value?! :", field.value);

    if (field.value !== "" || legitFields) {
      clearErrors(field.name);
      return;
    }
    setError(field.name, { type: "required", message: "this is required" });
  };

  return (
    <div className={styles.outerContainer}>
      <FormLabel className={styles.formLabel} id={field.name}>
        {props.signatureConfig.title}
      </FormLabel>
      {/* {signaturePadRef.current?.toDataURL() && (
        <Image
          width="200"
          height="100"
          src={signaturePadRef.current.toDataURL("image/jpeg", 1.0)}
          alt="signed digital signature"
        />
      )} */}
      <div className={styles.checkboxContainer}>
        <SignaturePad
          ref={signaturePadRef}
          canvasProps={{ className: "signature-pad" }}
          options={{
            minWidth: 2,
            maxWidth: 2,
            penColor: "black",
            backgroundColor: "white",
          }}
        />
      </div>
      <div className={styles.signatureButtonContainer}>
        <Button sx={{ mr: 1 }} onClick={clearSignature}>
          Clear
        </Button>
        <Button sx={{ mr: 1 }} onClick={saveSignature}>
          Save
        </Button>
      </div>
      {(errors?.[field.name]?.message && !field.value) ||
        (!fieldState.isDirty && (
          <FormHelperText error>{props.displayName} is required</FormHelperText>
        ))}
    </div>
  );
}
