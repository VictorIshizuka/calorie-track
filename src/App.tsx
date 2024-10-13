import Header from "./components/Header";
import Form from "./components/Form";
import { formDataReducer, initialState } from "./reducers/formData-reducer";
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(formDataReducer, initialState);
  return (
    <>
      <Header />
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} />
        </div>
      </section>
    </>
  );
}

export default App;
