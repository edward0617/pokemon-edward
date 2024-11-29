import axios from "axios";
import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import {
  BasicPokemonDataType,
  PokemonCardType,
  PokemonResultType,
} from "../types";
import PokemonCard from "./PokemonCard";

import "./Dashboard.scss";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<PokemonCardType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<PokemonResultType>(`${apiUrl}?limit=20`);
      const fetchApi = response.data.results;
      const result = await Promise.all(
        fetchApi.map(async (api: BasicPokemonDataType) => {
          const responseUrl = await axios.get<PokemonCardType>(api.url);
          return responseUrl.data;
        })
      );
      setPokemonData(result);
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredPokemonData = useMemo(() => {
    if (!searchValue) return pokemonData;
    return pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [pokemonData, searchValue]);

  return (
    <>
      <div className="dashboard-container">
        <input
          className="searh-input"
          onChange={handleSearchInputChange}
          value={searchValue}
          placeholder="Search Pokemon"
        />
        <div className="pokemon-container">
          {filteredPokemonData.map((pokemon: PokemonCardType) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
