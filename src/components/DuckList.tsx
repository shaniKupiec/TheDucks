import { useEffect, useState } from "react";
import DuckItem from './DuckItem';
import IDuck from '../interfaces/DuckInterface'
import { useAppSelector } from '../store/hooks';
import { selectDucks } from '../store/slices/duckSlice';
import { StyledGridContainer, StyledTitle } from '../styling/components/List';

function DuckList() {
  const duckList: IDuck[] = useAppSelector(selectDucks);

  useEffect(() => {
    //console.log("1 duckList length updated: ", duckList.length);

    return () => {
      //map.dispose();
    };
  }, [duckList.length]);

  return (
    <div>
      {
        duckList.length == 0 ? <div>Loading...</div> : 
      <>
        <StyledTitle>Duck List</StyledTitle>
          <StyledGridContainer>
            {duckList.map((duck) => (
              <div key={duck.id}>
                <DuckItem key={duck.id} duck={duck} />
              </div>
            ))}
          </StyledGridContainer>
      </>
      }
    </div>
  );
}

export default DuckList;
