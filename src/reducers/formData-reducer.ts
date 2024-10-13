import { FormDataProps } from "../types";

export type FormDataActions = {
  type: "save-formData";
  payload: { newFormData: FormDataProps };
};

type FormDataSate = {
  formData: FormDataProps[];
};

export const initialState: FormDataSate = { formData: [] };

export const formDataReducer = (
  state: FormDataSate = initialState,
  action: FormDataActions
) => {
  if (action.type === "save-formData") {
    console.log(action.payload.newFormData);
    return {
      ...state,
      formData: [...state.formData, action.payload.newFormData],
    };
  }
  return state;
};
