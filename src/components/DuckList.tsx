import DuckItem from './DuckItem';
import IDuck from '../interfaces/DuckInterface'
import { useAppSelector } from '../store/hooks';
import { selectDucks } from '../store/slices/duckSlice';

function DuckList() {
  //const duckList: IDuck[] = useAppSelector((state) => state.ducks.duck_list)
  const duckList: IDuck[] = useAppSelector(selectDucks)

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
