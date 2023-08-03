import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import DuckItem from './DuckItem';
import IDuck from '../interfaces/DuckInterface'
import { useAppSelector } from '../store/hooks';
import { selectDucks, load, fetchDucks } from '../store/slices/duckSlice';

function DuckList() {
  //const duckList: IDuck[] = useAppSelector((state) => state.ducks.duck_list)
  const duckList: IDuck[] = useAppSelector(selectDucks)
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(fetchDucks());
  }, [])


  return (
    <div className='duck-list'>
      {
        duckList.length == 0 ? <div>Loading...</div> : 
      <>
        <h1 className='duck-list__title' >Duck List</h1>
          <ul className='duck-list__container'>
            {duckList.map((duck) => (
              <li key={duck.id}>
              <DuckItem key={duck.id} duck={duck} />
              </li>
            ))}
          </ul>
      </>
      }
    </div>
  );
}

export default DuckList;
