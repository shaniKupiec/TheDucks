import RabbitItem from './RabbitItem';
import IRabbit from '../interfaces/RabbitInterface'
import { useAppSelector } from '../store/hooks';
import { selectRabbits } from '../store/slices/rabbitSlice';
import { StyledGridContainer, StyledTitle } from '../styling/components/List';

function RabbitList() {
  const rabbitList: IRabbit[] = useAppSelector(selectRabbits);

  return (
    <div>
      {
        rabbitList.length == 0 ? <div>Loading...</div> : 
      <>
        <StyledTitle>Rabbit List</StyledTitle>
          <StyledGridContainer>
            {rabbitList.map((rabbit) => (
              <li key={rabbit.id}>
                <RabbitItem key={rabbit.id} rabbit={rabbit} />
              </li>
            ))}
          </StyledGridContainer>
      </>
      }
    </div>
  );
}

export default RabbitList;