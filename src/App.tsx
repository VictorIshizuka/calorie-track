import Header from "./components/Header";
import Form from "./components/Form";
import { formDataReducer, initialState } from "./reducers/formData-reducer";
import { useEffect, useMemo, useReducer } from "react";
import ActivityList from "./components/List";
import DashBoardCalorieTrack from "./components/Dashboard";

function App() {
  const [state, dispatch] = useReducer(formDataReducer, initialState);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(state.formData));
  }, [state.formData]);

  const canRestartApp = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(() => state.formData.length, [state.formData]);
  return (
    <>
      <Header dispatch={dispatch} disabled={!canRestartApp()} />
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className="bg-gray-600 py-10">
        <div className="max-w-4xl mx-auto">
          <DashBoardCalorieTrack formData={state.formData} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList formData={state.formData} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
