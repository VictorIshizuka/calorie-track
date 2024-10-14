import { FormDataProps } from "../types";

export type FormDataActions =
  | { type: "save-formData"; payload: { newFormData: FormDataProps } }
  | { type: "set-formData"; payload: { id: string } }
  | { type: "remove-formData"; payload: { id: string } }
  | { type: "restart-formData" };

export type FormDataSate = {
  formData: FormDataProps[];
  activeId: string;
};

const localStorageFormData = (): FormDataProps[] => {
  const formData = localStorage.getItem("formData");
  return formData ? JSON.parse(formData) : [];
};

export const initialState: FormDataSate = {
  formData: localStorageFormData(),
  activeId: "",
};

export const formDataReducer = (
  state: FormDataSate = initialState,
  action: FormDataActions
) => {
  if (action.type === "save-formData") {
    let updatedActivities: FormDataProps[] = [];
    if (state.activeId) {
      updatedActivities = state.formData.map(item =>
        item.id === state.activeId ? action.payload.newFormData : item
      );
    } else {
      updatedActivities = [...state.formData, action.payload.newFormData];
    }
    return {
      ...state,
      formData: updatedActivities,
      activeId: "",
    };
  }
  if (action.type === "set-formData") {
    return { ...state, activeId: action.payload.id };
  }

  if (action.type === "remove-formData") {
    return {
      ...state,
      formData: state.formData.filter(item => item.id !== action.payload.id),
    };
  }
  if (action.type === "restart-formData") {
    return {
      formData: [],
      activeId: "",
    };
  }
  return state;
};
