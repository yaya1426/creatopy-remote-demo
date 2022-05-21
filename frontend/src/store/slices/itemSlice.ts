import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "models/item";

export interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex((x) => x.id === action.payload);
      state.items.splice(itemIndex, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = itemSlice.actions;

export default itemSlice.reducer;
