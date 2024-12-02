import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  BasicPokemonDataType,
  PokemonCardType,
  PokemonResultType,
} from "../types";
import PokemonCard from "./PokemonCard";
import {
  setPokemonData,
  setFilteredPokemonData,
  setCurrentPage,
  setSearchValue,
} from "../redux/slice/pokemonSlice";

import "./Dashboard.scss";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";

const Dashboard: React.FC = () => {
  const { pokemonData, filteredPokemonData, currentPage, searchValue } =
    useSelector((state: any) => state.pokemon);
    console.log(pokemonData);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);

  const dispatch = useDispatch();

  const fetchData = async () => {
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
      dispatch(setPokemonData(result));
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
    handleSearchValueChange(event.target.value);
  };

  const handleSearchValueChange = (searchValue: string) => {
    console.log(pokemonData);
    const newFilteredData = pokemonData.filter((pokemon: PokemonCardType) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(newFilteredData);
    dispatch(setSearchValue(searchValue));
    dispatch(setFilteredPokemonData(newFilteredData));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
