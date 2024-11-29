import React, { useState } from "react";
import { PokemonCardType } from "../types";

import "./PokemonCard.scss";

interface PokemonCardProps {
  pokemon: PokemonCardType;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  console.log("###", imageIndex, Object.values(pokemon.sprites));

  return (
    <div className="card-container">
      <div className="card-container__image-container">
        <div
          className={`card-container__image-container__prev-button${
            imageIndex === 0 ? " disabled" : ""
          }`}
          onClick={() =>
            setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageIndex)
          }
        >
          &lt;
        </div>
        <img
          src={Object.values(pokemon.sprites)[imageIndex * 2]}
          alt={Object.keys(pokemon.sprites)[imageIndex * 2]}
        />
        <div
          className={`card-container__image-container__next-button${
            imageIndex === 3 ? " disabled" : ""
          }`}
          onClick={() =>
            setImageIndex(imageIndex < 3 ? imageIndex + 1 : imageIndex)
          }
        >
          &gt;
        </div>
      </div>
      <div className="card-container__card-name">{pokemon.name}</div>
    </div>
  );
};

export default PokemonCard;
