import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../index'
import IDuck from "../../interfaces/DuckInterface";

export interface DuckState {
  duck_list: IDuck[];
}

const initialState: DuckState = {
    duck_list: [],
};

export const duckSlice = createSlice({
  name: "ducks",
  initialState,
  reducers: {
    LOAD: (state, action: PayloadAction<IDuck[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.duck_list =action.payload;
    },
    DUPLICATE: (state, action: PayloadAction<number>) => {
      let duckToDuplicate: IDuck | undefined = state.duck_list.find((duck: IDuck) => {
        return duck.id == action.payload;
      });
      if(duckToDuplicate != undefined){
        let newDuck = JSON.parse(JSON.stringify(duckToDuplicate));
        newDuck.id = state.duck_list[state.duck_list.length - 1].id + 1;
        state.duck_list.push(newDuck);
      }
    },
    REMOVE: (state, action: PayloadAction<number>) => {
      let idxDuckToRemove :number = state.duck_list.findIndex((duck: IDuck) => {
        return duck.id == action.payload;
      });
      state.duck_list.splice(idxDuckToRemove, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { LOAD, DUPLICATE, REMOVE } = duckSlice.actions;

export default duckSlice.reducer;

export const selectDucks = (state: RootState) => state.ducks.duck_list
