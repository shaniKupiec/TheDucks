import { useEffect } from "react";
import DuckList from "./components/DuckList";
import { useDispatch } from "react-redux";
import { load } from "./store/slices/duckSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load());
  }, [])

  return (
    <>
      <DuckList/>
    </>
  );
}

export default App;