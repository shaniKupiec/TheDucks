import RabbitItem from './RabbitItem';
import IRabbit from '../interfaces/RabbitInterface'
import { useAppSelector } from '../store/hooks';
// import { selectRabbits } from '../store/slices/rabbitSlice';

function RabbitList() {
// const rabbitList: IRabbit[] = useAppSelector(selectRabbits);
const rabbitList: IRabbit[] = [
    {
      "id": 1,
      "img_src": "https://cdn.shopify.com/s/files/1/0529/8693/7544/products/AN573_840px_360x.png?v=1623686382",
      "ear_len": 2,
      "name" : "Lolo",
      "latitude": 51.069017,
      "longitude": 8.175066
    },
    {
      "id": 2,
      "img_src": "https://cdn.shopify.com/s/files/1/0529/8693/7544/products/382_CHAR_840px_360x.png?v=1624979221",
      "ear_len": 1,
      "name" : "Roro",
      "latitude": 54.265224,
      "longitude": 73.914318
    },
    {
      "id": 3,
      "img_src": "https://cdn.shopify.com/s/files/1/0529/8693/7544/products/345B_CHAR_840px_360x.png?v=1623688580",
      "ear_len": 2,
      "name" : "Bobo",
      "latitude": 12.039321,
      "longitude": 77.608618
    },
    {
      "id": 4,
      "img_src": "https://cdn.shopify.com/s/files/1/0529/8693/7544/products/316G_CHAR_840px_360x.png?v=1631620932",
      "ear_len": 4,
      "name" : "Gogo",
      "latitude": 36.597889,
      "longitude": -98.867312
    }
  ];

  return (
    <div className='rabbit-list'>
      {
        rabbitList.length == 0 ? <div>Loading...</div> : 
      <>
        <h1 className='rabbit-list__title' >Rabbit List</h1>
          <ul className='rabbit-list__container'>
            {rabbitList.map((rabbit) => (
              <li key={rabbit.id}>
                <RabbitItem key={rabbit.id} rabbit={rabbit} />
              </li>
            ))}
          </ul>
      </>
      }
    </div>
  );
}

export default RabbitList;