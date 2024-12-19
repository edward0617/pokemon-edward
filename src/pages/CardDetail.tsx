import React, { useState, useEffect } from "react";
import { PokemonCardType } from "../types";
import EvolutionChain from "../components/EvolutionChain";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router";

import "./CardDetail.scss";
import axios from "axios";

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [evolution, setEvolution] = useState<any[]>([]);
  const [pokemon, setPokemon] = useState<PokemonCardType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<PokemonCardType>(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
        console.log("Card Detail Data", response.data);

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        console.log(speciesResponse);
        const evolutionResponse = await axios.get(
          speciesResponse.data["evolution_chain"]["url"]
        );
        const evolutionResult = evolutionResponse.data;

        const constrcutEvolutionData = (evolutionChain: any, name: any) => {
          name.push({
            id: evolutionChain.species.url.split("/").at(-2),
            name: evolutionChain.species.name,
            level: name.length,
          });
          if (evolutionChain["evolves_to"].length > 0) {
            evolutionChain["evolves_to"].forEach((item: any) =>
              constrcutEvolutionData(item, name)
            );
          }
          return name;
        };

        setEvolution(constrcutEvolutionData(evolutionResult["chain"], []));
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch the data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="details-container">
      <Link to="/">
        <div className="close-button">&times;</div>
      </Link>
      <div
        className={`details-image-container type-${pokemon?.types[0].type.name}`}
      >
        <img
          className="details-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.id}.png`}
          alt={pokemon?.name}
        />
      </div>
      <div className={`details-info type-${pokemon?.types[0].type.name}`}>
        <p className="details-name">{pokemon?.name?.toUpperCase()}</p>
        <p className="details-type">
          TYPE:{" "}
          {pokemon?.types
            ?.map((item) => item.type.name.toUpperCase())
            .join(" - ")}
        </p>
      </div>
      <div className="details-skill">
        {pokemon?.stats.map((item, index) => (
          <div className="details-skill-item" key={`skill-${index}`}>
            <p className="details-skill-item-text">
              {item.stat.name.toUpperCase()}:
            </p>
            <div className="details-skill-progress-bar-container">
              <div
                className={`details-skill-progress-bar type-${pokemon?.types[0].type.name} data-${item.base_stat}`}
                style={{ width: `${item.base_stat}%` }}
              />
              <p className="details-skill-progress-bar-text">
                {item.base_stat}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={`details-sec-info type-${pokemon?.types[0].type.name}`}>
        <div className="details-info-text">
          <p className="details-info-label">WEIGHT:</p>
          <p className="details-info-content">{pokemon?.weight}</p>
        </div>
        <div className="details-info-text">
          <p className="details-info-label">HEIGHT:</p>
          <p className="details-info-content">{pokemon?.height}</p>
        </div>
      </div>
      <EvolutionChain
        evolution={evolution}
        type={pokemon?.types[0].type.name}
      />
      {isLoading && <Loader />}
    </div>
  );
};

export default CardDetail;
