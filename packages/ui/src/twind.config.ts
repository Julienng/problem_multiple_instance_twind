import type { Configuration } from "twind";
import { setup } from "twind";
import {
  formInput,
  formSelect,
  formCheckbox,
  formRadio,
  formTextarea,
  formFile,
  formField,
} from "@twind/forms";

export const plugins: Configuration["plugins"] = {
  "form-input": formInput,
  "form-select": formSelect,
  "form-checkbox": formCheckbox,
  "form-radio": formRadio,
  "form-textarea": formTextarea,
  "form-file": formFile,
  "form-field": formField,
};

export const twindConfig: Configuration = {
  plugins,
};

// if i uncomment this line, the input with form-input will work
// setup(twindConfig);
