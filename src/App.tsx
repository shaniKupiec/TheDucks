import { useEffect } from "react";
import DuckList from "./components/DuckList";
import MapComponent from './Map/MapComponent';
import { useDispatch } from "react-redux";
import { LOAD } from "./store/slices/duckSlice";
import { fetchDucks } from "./services/duckService";
import IDuck from "./interfaces/DuckInterface";

function App() {
  const dispatch = useDispatch();

  useEffect(() => { 
    const fetchData = async() => {
      try{
        const featchedDucks: IDuck[] = await fetchDucks();
        dispatch(LOAD(featchedDucks));
      } catch (error){
        console.error(error);
      }
    }

    fetchData();
  }, [])

  
  return (
    <>
      <MapComponent /> 
      <DuckList/>
    </>
  );
}

export default App;