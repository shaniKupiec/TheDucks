// import RabbitItem from './RabbitItem';
// import IRabbit from '../interfaces/RabbitInterface'
// import { useAppSelector } from '../store/hooks';
// import { selectRabbits } from '../store/slices/rabbitSlice';

function RabbitList() {
//   const rabbitList: IRabbit[] = useAppSelector(selectRabbits)

  return (
    <div className='rabbit-list'>
      {/* {
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
      } */}
    </div>
  );
}

export default RabbitList;