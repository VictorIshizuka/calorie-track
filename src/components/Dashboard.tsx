import { useMemo } from "react";
import { FormDataProps } from "../types";

type FormDataSate = {
  formData: FormDataProps[];
};

const DashBoardCalorieTrack = ({ formData }: FormDataSate) => {
  const caloriesConsumed = useMemo(
    () =>
      formData.reduce(
        (total, item) => (item.category === 1 ? total + item.calories : total),
        0
      ),
    [formData]
  );
  const caloriesBurned = useMemo(
    () =>
      formData.reduce(
        (total, item) => (item.category === 2 ? total + item.calories : total),
        0
      ),
    [formData]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [formData]
  );
  return (
    <>
      <h2 className="font-black text-4xl text-white text-center">
        Resumo das calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
          <span className="font-back text-6xl text-orange-500">
            {caloriesConsumed}
          </span>
          Consumidas
        </p>
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
          <span className="font-back text-6xl text-orange-500">
            {netCalories}
          </span>
          Diferença
        </p>
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
          <span className="font-back text-6xl text-orange-500">
            {caloriesBurned}
          </span>
          Exercícios
        </p>
      </div>
    </>
  );
};
export default DashBoardCalorieTrack;
