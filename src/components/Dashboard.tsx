import axios from "axios";
import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import {
  BasicPokemonDataType,
  PokemonCardType,
  PokemonResultType,
} from "../types";
import PokemonCard from "./PokemonCard";

import "./Dashboard.scss";
import Pagination from "./Pagination";
import Loader from "./Loader";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<PokemonCardType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async () => {
    console.log(currentPage);
    try {
      setLoading(true);
      const response = await axios.get<PokemonResultType>(
        `${apiUrl}?offset=${(currentPage - 1) * 20}&limit=20`
      );
      setTotalPage(Math.ceil(response.data.count / 20));
      const fetchApi = response.data.results;
      const result = await Promise.all(
        fetchApi.map(async (api: BasicPokemonDataType) => {
          const responseUrl = await axios.get<PokemonCardType>(
            `${apiUrl}/${api.name}`
          );
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
  }, [currentPage]);

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
    <div className="dashboard-container">
      <input
        className="search-input"
        onChange={handleSearchInputChange}
        value={searchValue}
        placeholder="Search Pokemon"
      />
      <div className="pokemon-container">
        {loading ? (
          <Loader />
        ) : (
          filteredPokemonData.map((pokemon: PokemonCardType) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))
        )}
      </div>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Dashboard;
