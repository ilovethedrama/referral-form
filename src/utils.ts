import {
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
export const setRadioError = (
    fieldName: any,
    fieldValue: any,
    radioIsValid: boolean,
    setError: Function,
  ) => {
    if (fieldValue === "" && radioIsValid === false) {
      setError(fieldName, { type: "required", message: "this is required" });
      return;
    }
  };