import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Monster {
  id: number;
  name: string;
}

interface Adventure {
  id: number;
  name: string;
  description: string;
}

interface AdventureState {
  adventures: Adventure[];
  monsters: Monster[];
}

const initialState: AdventureState = {
  adventures: [],
  monsters: [],
};

const adventureSlice = createSlice({
  name: 'adventure',
  initialState,
  reducers: {
    setAdventures(state, action: PayloadAction<Adventure[]>) {
      state.adventures = action.payload;
    },
    setMonsters(state, action: PayloadAction<Monster[]>) {
      state.monsters = action.payload;
    },
  },
});

export const { setAdventures, setMonsters } = adventureSlice.actions;
export default adventureSlice.reducer;
