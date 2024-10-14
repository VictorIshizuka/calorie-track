import { useState, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data";
import { FormDataProps } from "../types";
import { FormDataActions, FormDataSate } from "../reducers/formData-reducer";

type FormProps = {
  dispatch: Dispatch<FormDataActions>;
  state: FormDataSate;
};

const Form = ({ dispatch, state }: FormProps) => {
  const [formData, setFormData] = useState<FormDataProps>({
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  });

  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.formData.filter(
        item => item.id === state.activeId
      )[0];
      console.log(selectActivity);
      setFormData(selectActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setFormData({
      ...formData,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidFormData = () => {
    const { name, calories } = formData;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    dispatch({ type: "save-formData", payload: { newFormData: formData } });
    setFormData({ id: uuidv4(), category: 1, name: "", calories: 0 });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3 ">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Atividade:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ex.: Comida, Suco de laranja, Salada, Exercício, Peso, Bicicleta"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias, ex.: 300"
          value={formData.calories}
          onChange={handleChange}
        />
      </div>
      <input
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        type="submit"
        value={formData.category === 1 ? "Salavr Comida" : "Salvar Excercício"}
        disabled={!isValidFormData()}
      />
    </form>
  );
};

export default Form;
