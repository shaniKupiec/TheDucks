import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../index'
import IRabbit from "../../interfaces/RabbitInterface";

export interface RabbitState {
  rabbit_list: IRabbit[];
}

const initialState: RabbitState = {
    rabbit_list: [],
};

export const rabbitSlice = createSlice({
  name: "rabbits",
  initialState,
  reducers: {
    LOAD: (state, action: PayloadAction<IRabbit[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.rabbit_list =action.payload;
    },
    DUPLICATE: (state, action: PayloadAction<number>) => {
      let RabbitToDuplicate: IRabbit | undefined = state.rabbit_list.find((rabbit: IRabbit) => {
        return rabbit.id == action.payload;
      });
      if(RabbitToDuplicate != undefined){
        let newRabbit = JSON.parse(JSON.stringify(RabbitToDuplicate));
        newRabbit.id = state.rabbit_list[state.rabbit_list.length - 1].id + 1;
        state.rabbit_list.push(newRabbit);
      }
    },
    REMOVE: (state, action: PayloadAction<number>) => {
      let idxRabbitToRemove :number = state.rabbit_list.findIndex((rabbit: IRabbit) => {
        return rabbit.id == action.payload;
      });
      state.rabbit_list.splice(idxRabbitToRemove, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { LOAD, DUPLICATE, REMOVE } = rabbitSlice.actions;

export default rabbitSlice.reducer;

export const selectRabbits = (state: RootState) => state.rabbits.rabbit_list;
