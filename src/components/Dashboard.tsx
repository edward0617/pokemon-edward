import axios from "axios";
import React, { useState, useEffect } from "react";
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

  return (
    <div className="dashboard-container">
      <div className="pokemon-container">
        {pokemonData.length > 0 &&
          pokemonData.map((pokemon, index) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
