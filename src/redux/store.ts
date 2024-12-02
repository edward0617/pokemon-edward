import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./slice/pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});

export default store;
