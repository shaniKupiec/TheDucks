import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../index'
import IDuck from "../../interfaces/DuckInterface";

export interface DuckState {
  duck_list: IDuck[];
}

const initialState: DuckState = {
    duck_list: [],
};

export const fetchDucks: any = createAsyncThunk(
  'ducks/fetchDucks',
  async () => {
    const response = await fetch('/public/data/duckList.json');
    return (await response.json()) as IDuck[];
  }
)

export const duckSlice = createSlice({
  name: "ducks",
  initialState,
  reducers: {
    load: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.duck_list = [
        {
          id: 1,
          img_num: 1,
          occupation: "bachelor",
          name: "Shani",
        },
        {
          id: 2,
          img_num: 2,
          occupation: "couple",
          name: "Mimi & Nono",
        },
        {
          id: 3,
          img_num: 3,
          occupation: "doctor",
          name: "Hodaya",
        },
        {
          id: 4,
          img_num: 4,
          occupation: "unicorn",
          name: "Tamir",
        },
      ];
    },
    duplicate: (state, action: PayloadAction<number>) => {
      // console.log("got to here: id is: ", action.payload);
      // console.log("state.duck_list[state.duck_list.length - 1].id, ", state.duck_list[state.duck_list.length - 1].id);
      let duckToDuplicate: IDuck | undefined = state.duck_list.find((duck: IDuck) => {
        return duck.id == action.payload;
      });
      if(duckToDuplicate != undefined){
        let newDuck = JSON.parse(JSON.stringify(duckToDuplicate));
        newDuck.id = state.duck_list[state.duck_list.length - 1].id + 1;
        state.duck_list.push(newDuck);
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      let idx :number = state.duck_list.findIndex((duck: IDuck) => {
        return duck.id == action.payload
      });
      state.duck_list.splice(idx, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDucks.fulfilled, (state, action) => {
      state.duck_list = action.payload;
    })
  }
});

// Action creators are generated for each case reducer function
export const { load, duplicate, remove } = duckSlice.actions;

export default duckSlice.reducer;

export const selectDucks = (state: RootState) => state.ducks.duck_list
