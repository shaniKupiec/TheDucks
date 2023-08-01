import { useEffect, useState } from 'react';
import DuckItem from './DuckItem';
import Duck from '../interfaces/DuckInterface'

function DuckList() {
  const [duckList, setDuckList] = useState<Duck[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/public/data/duckList.json');
        const data: Duck[] = await response.json();
        setDuckList(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchData();
  }, []);


  // Render your component based on the duckList state
  if (duckList === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='duck-list'>
     <h1 className='duck-list__title' >Duck List</h1>
      <ul className='duck-list__container'>
        {duckList.map((duck) => (
          <li key={duck.id}>
           <DuckItem key={duck.id} duck={duck} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DuckList;
