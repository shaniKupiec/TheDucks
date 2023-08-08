import { useEffect } from "react";
import DuckList from "./components/DuckList";
import MapComponent from './Map/MapComponent';
import { useDispatch } from "react-redux";
import { LOAD as LOAD_DUCKS } from "./store/slices/duckSlice";
import { LOAD as LOAD_RABBITS } from "./store/slices/rabbitSlice";
import { fetchDucks } from "./services/duckService";
import IDuck from "./interfaces/DuckInterface";
import RabbitList from "./components/RabbitList";
import IRabbit from "./interfaces/RabbitInterface";
import { fetchRabbits } from "./services/rabbitService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => { 
    const fetchData = async() => {
      try{
        const featchedDucks: IDuck[] = await fetchDucks();
        dispatch(LOAD_DUCKS(featchedDucks));
        const featchedRabbits: IRabbit[] = await fetchRabbits();
        dispatch(LOAD_RABBITS(featchedRabbits));
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
      <RabbitList/>
    </>
  );
}

export default App;