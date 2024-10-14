import { FormDataActions } from "../reducers/formData-reducer";

const Header = ({
  disabled,
  dispatch,
}: {
  disabled: boolean;
  dispatch: React.Dispatch<FormDataActions>;
}) => {
  return (
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de calorias
        </h1>
        <button
          disabled={disabled}
          className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer  rounded-lg text-sm disabled:opacity-10"
          onClick={() => dispatch({ type: "restart-formData" })}
        >
          Reiniciar aplicação
        </button>
      </div>
    </header>
  );
};

export default Header;
