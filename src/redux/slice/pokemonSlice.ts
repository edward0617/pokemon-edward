import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonCardType } from "../../types";

interface PokemonState {
  pokemonData: PokemonCardType[];
  filteredPokemonData: PokemonCardType[];
  currentPage: number;
  searchValue: string;
}

const initialState: PokemonState = {
  pokemonData: [],
  filteredPokemonData: [],
  currentPage: 1,
  searchValue: "",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonData: (
      state: PokemonState,
      action: PayloadAction<PokemonCardType[]>
    ) => {
      const newState = {
        ...state,
        pokemonData: action.payload,
        filteredPokemonData: action.payload,
      };
      return newState;
    },
    setFilteredPokemonData: (
      state: PokemonState,
      action: PayloadAction<PokemonCardType[]>
    ) => {
      const newState = { ...state, filteredPokemonData: action.payload };
      return newState;
    },
    setCurrentPage: (state: PokemonState, action: PayloadAction<number>) => {
      const newState = { ...state, currentPage: action.payload };
      return newState;
    },
    setSearchValue: (state: PokemonState, action: PayloadAction<string>) => {
      return { ...state, searchValue: action.payload };
    },
  },
});

export const {
  setPokemonData,
  setFilteredPokemonData,
  setCurrentPage,
  setSearchValue,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
