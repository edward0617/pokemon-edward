import React, { useState } from "react";
import { PokemonCardType } from "../types";

import "./PokemonCard.scss";

interface PokemonCardProps {
  pokemon: PokemonCardType;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const firstType = pokemon.types[0].type.name;
  return (
    <div className={`card-container ${firstType}`}>
      <div className={`card-image ${firstType}`}>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id
            .toString()
            .padStart(3, "0")}.png`}
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
    </div>
  );
};

export default PokemonCard;
