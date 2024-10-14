import { useMemo } from "react";
import { categories } from "../data";
import { FormDataProps } from "../types";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FormDataActions } from "../reducers/formData-reducer";

type FormDataSate = {
  formData: FormDataProps[];
  dispatch: React.Dispatch<FormDataActions>;
};

const ActivityList = ({ formData, dispatch }: FormDataSate) => {
  const categoryName = useMemo(
    () => (category: number) =>
      categories.map(item => (item.id === category ? item.name : "")),
    [formData]
  );

  const isEmptyActivities = useMemo(() => formData.length === 0, [formData]);

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida e Atividades
      </h2>
      {isEmptyActivities ? (
        <p className="text-center my-5">Não possui atividades no momento</p>
      ) : (
        formData.map((item, index) => (
          <div
            key={index}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  item.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+item.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{item.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {item.calories} <span>Calorias</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({ type: "set-formData", payload: { id: item.id } })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "remove-formData",
                    payload: { id: item.id },
                  })
                }
              >
                <XCircleIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
