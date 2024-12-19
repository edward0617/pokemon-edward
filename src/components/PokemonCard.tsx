import React, { useState } from "react";
import { PokemonCardType } from "../types";

import "./PokemonCard.scss";
import Loader from "./Loader";
import { Link } from "react-router";

interface PokemonCardProps {
  pokemon: PokemonCardType;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isLoad, setIsLoad] = useState(false);
  const firstType = pokemon.types[0].type.name;

  const handleOnLoad = () => {
    setIsLoad(true);
  };

  console.log("Pokemon Card Data", pokemon);

  return (
    <div className={`card-container ${firstType}`}>
      <Link to={`/details/${pokemon.id}`}>
        <div className={`card-image ${firstType}`}>
          {!isLoad && <Loader />}
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id
              .toString()
              .padStart(3, "0")}.png`}
            onLoad={handleOnLoad}
            alt={pokemon.name}
          />
        </div>
        <div className="card-detail">
          <div className="card-name">{pokemon.name.toUpperCase()}</div>
          <div className="card-badge-container">
            {pokemon.types.map((item) => (
              <div
                className={`card-badge ${item.type.name}`}
                key={`${pokemon.name}-${item.type.name}`}
              >
                {item.type.name.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
